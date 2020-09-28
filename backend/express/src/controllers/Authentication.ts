import { Token } from 'src/entities/token'

export class AuthenticationController {

    async getTokenFromCode(code: string) {

        const token = await Token.fromCode(code);
        return token.accessToken;

    }

}
