import { AssertionError } from 'assert';
import axios from 'axios';
import { MongoClient, Collection } from 'mongodb';
import { Observable, Subscriber, Subscription } from 'rxjs';


const DB_URL = process.env.DB_URL;
if (!DB_URL || DB_URL === '') {
  throw new Error("Environment variable 'DB_URL' is undefined.");
}
// Implicitly required:
// process.env.MONGO_INITDB_ROOT_USERNAME
// process.env.MONGO_INITDB_ROOT_PASSWORD

const DB_NAME = 'isk-printer';
const TYPE_COLLECTION_NAME = 'types';
const MAX_RETRIES = 4;

interface Type {
  typeId: number,
  typeName: string
}

const THROTTLE_LIMIT = 16;

let runningRequestLoops: number = 0;
const requestQueue: [Subscriber<any>, () => Promise<any>][] = [];

async function getMarketableTypes(): Promise<Type[]> {

  const marketGroupsResponse = await sendRequest(() => axios.get('https://esi.evetech.net/latest/markets/groups'));
  const marketGroupIds: number[] = marketGroupsResponse.data;

  const marketGroups: any[] = await Promise.all(marketGroupIds.map(async (marketGroupId) => {
    let marketGroupResponse;
    try {
      marketGroupResponse = await sendRequest(() => axios.get(`https://esi.evetech.net/latest/markets/groups/${marketGroupId}`));
    } catch (error) {
      console.error(error);
    }
    const marketGroup = marketGroupResponse.data;
    console.log(`[GROUP] ${marketGroup.market_group_id}: ${marketGroup.name}`);
    return marketGroup;
  }));

  const typeIds: number[] = marketGroups
    .map((marketGroup) => marketGroup.types)
    .reduce((allTypeIds, typeIdsOfSingleGroup) => {
      return [
        ...allTypeIds,
        ...typeIdsOfSingleGroup
      ];
    });

  const types: Type[] = await Promise.all(typeIds.map(async (typeId) => {
    let typeResponse;
    try {
      typeResponse = await sendRequest(() => axios.get(`https://esi.evetech.net/latest/universe/types/${typeId}`));
    } catch (error) {
      console.error(error);
    }
    const typeData = typeResponse.data;
    const type = { typeId: typeData.type_id, typeName: typeData.name };
    console.log(`[TYPE] ${type.typeId}: ${type.typeName}`);
    return type;
  }));

  return types;

}

async function sendRequest(next: () => Promise<any>): Promise<any> {
  return new Observable((observer) => {

    requestQueue.push([observer, next]);
    if (runningRequestLoops < THROTTLE_LIMIT) {
      startNewRequestLoop();
    }

  }).toPromise();
}

async function startNewRequestLoop(): Promise<void> {
  runningRequestLoops += 1;

  while (requestQueue.length > 0) {

    const request = requestQueue.shift();
    if (request === undefined) {
      throw new AssertionError();
    }
    const [observer, next] = request;

    let error;
    for (const _ of new Array(MAX_RETRIES)) {
      error = undefined;
      try {
        const response = await next();
        observer.next(response);
        break;
      } catch (err) {
        error = err;
      }
    }
    if (error) {
      observer.error(error);
    }
    observer.complete();

  }

  runningRequestLoops -= 1;
}



async function withCollection(next: (collection: Collection<any>) => Promise<any>): Promise<void> {

  if (DB_URL === undefined) {
    throw new AssertionError();
  }
  const client = new MongoClient(DB_URL, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(TYPE_COLLECTION_NAME);

  await next(collection);

  await client.close();

}

getMarketableTypes()
  .then((types) => {
    withCollection(async (collection) => {
      for (const type of types) {
        try {
          await collection.replaceOne({ typeId: type.typeId }, type, { upsert: true });
        } catch (error) {
          console.error(error);
        }
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
