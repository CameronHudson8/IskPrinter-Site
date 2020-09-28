import axios from 'axios';
import { MongoClient} from 'mongodb';
import { PersistentEntity } from './PersistentEntity';

export class Token implements PersistentEntity {

    static DB_URL = 'mongodb://localhost:27017';
    static DB_NAME = 'isk-printer';

    accessToken: string;
    refreshToken: string;

    constructor(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    static async fromCode(code: string): Promise<Token> {

        const basicAuth = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
        const encodedBasicAuth = Buffer.from(basicAuth).toString('base64');
        const config = {
            headers: {
                Authorization: `Basic ${encodedBasicAuth}`
            }
        };
        const body = {
            grant_type: 'authorization_code',
            code
        };
        const eveResponse = await axios.post('https://login.eveonline.com/oauth/token', body, config);
        const {
            access_token: accessToken,
            refresh_token: refreshToken
        } = eveResponse.data;

        const token = new Token(accessToken, refreshToken);
        await token.save();
        return token;

    }

    async save(): Promise<PersistentEntity> {

        const client = new MongoClient(Token.DB_URL, { useUnifiedTopology: true });
        await client.connect();
      
        const db = await client.db(Token.DB_NAME);
        const collection = await db.collection('tokens');
        await collection.insertOne(this);
      
        await client.close();

        return this;

    }

}
