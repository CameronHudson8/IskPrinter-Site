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

  const marketGroups: any[] = await Promise.all(marketGroupIds
    .map(async (marketGroupId) => {
      const marketGroupResponse = await axios.get(`https://esi.evetech.net/latest/markets/groups/${marketGroupId}`);
      const marketGroup = marketGroupResponse.data;
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
    const typeResponse = await axios.get(`https://esi.evetech.net/latest/universe/types/${typeId}`);
    const typeName: string = typeResponse.data.name;
    console.log(`${typeId}: ${typeName}`)
    return { typeId, typeName };
  }));

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
      await collection.deleteMany({});
      await collection.insertMany(types)
    });
  });
