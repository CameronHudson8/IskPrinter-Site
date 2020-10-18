import axios from 'axios';
import { MongoClient, Collection } from 'mongodb';

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

const withRetry = async (next: () => any) => {
  let error;
  for (const _ of new Array(MAX_RETRIES)) {
    try {
      return await next();
    } catch (e) {
      error = e;
      if (e.response?.status === 404) {
        // Don't bother retrying.
        throw error;
      }
      // If not 404, then try again.
    }
  }
  console.error(`Unable to complete request after ${MAX_RETRIES} tries.`);
  throw error;
};

const getMarketableTypes = async (): Promise<Type[]> => {

  const marketGroupsResponse = await withRetry(() => axios.get('https://esi.evetech.net/latest/markets/groups'));
  const marketGroupIds: number[] = marketGroupsResponse.data;

  const marketGroups: any[] = [];
  for (const marketGroupId of marketGroupIds) {
    let marketGroupResponse;
    try {
      marketGroupResponse = await withRetry(() => axios.get(`https://esi.evetech.net/latest/markets/groups/${marketGroupId}`));
    } catch (error) {
      console.error(error);
      continue;
    }
    const marketGroup = marketGroupResponse.data;
    marketGroups.push(marketGroup);
    console.log(`[GROUP] ${marketGroup.market_group_id}: ${marketGroup.name}`);
  }

  const typeIds: number[] = marketGroups
    .map((marketGroup) => marketGroup.types)
    .reduce((allTypeIds, typeIdsOfSingleGroup) => {
      return [
        ...allTypeIds,
        ...typeIdsOfSingleGroup
      ];
    });

  const types: Type[] = [];
  for (const typeId of typeIds) {
    let typeResponse;
    try {
      typeResponse = await withRetry(() => axios.get(`https://esi.evetech.net/latest/universe/types/${typeId}`));
    } catch (error) {
      console.error(error);
      continue;
    }
    const typeData = typeResponse.data;
    const type = { typeId: typeData.type_id, typeName: typeData.name };
    types.push(type);
    console.log(`[TYPE] ${type.typeId}: ${type.typeName}`)
  }

  return types;

}

const withCollection = async (next: (collection: Collection<any>) => Promise<any>): Promise<void> => {

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
