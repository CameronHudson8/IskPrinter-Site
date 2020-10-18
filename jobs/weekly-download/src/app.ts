import axios from 'axios';
import { MongoClient, Collection } from 'mongodb';

const DB_URL = process.env.DB_URL;
// Implicitly required:
// process.env.MONGO_INITDB_ROOT_USERNAME
// process.env.MONGO_INITDB_ROOT_PASSWORD

const DB_NAME = 'isk-printer';
const TYPE_COLLECTION_NAME = 'types';

interface Type {
  typeId: number,
  typeName: string
}

const getMarketableTypes = async (): Promise<Type[]> => {

  console.log('Getting marketable types...');

  const marketGroupsResponse = await axios.get('https://esi.evetech.net/latest/markets/groups');
  const marketGroupIds: number[] = marketGroupsResponse.data;

  const marketGroups: any[] = [];
  for (const marketGroupId of marketGroupIds) {
    const marketGroupResponse = await axios.get(`https://esi.evetech.net/latest/markets/groups/${marketGroupId}`);
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
    const typeResponse = await axios.get(`https://esi.evetech.net/latest/universe/types/${typeId}`);
    const typeData = typeResponse.data;
    const type = { typeId: typeData.type_id, typeName: typeData.name };
    types.push(type);
    console.log(`[TYPE] ${type.typeId}: ${type.typeName}`)
  }

  return types;

}

const withCollection = async (next: (collection: Collection<any>) => Promise<any>): Promise<void> => {

  if (!DB_URL || DB_URL === '') {
    throw new Error("Environment variable 'DB_URL' is undefined.");
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
        await collection.updateOne({ typeId: type.typeId }, type);
      }
    });
  });
