import axios from 'axios';

export class Token {

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

        // TODO: Save to database

        return new Token(accessToken, refreshToken)

    }

}
