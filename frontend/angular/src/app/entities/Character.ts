import { AuthenticatorService } from '../services/authenticator/authenticator.service';

export class Character {

    authenticatorService: AuthenticatorService;

    CharacterID: number;
    CharacterName: string;
    ExpiresOn: Date;
    TokenType: string;
    CharacterOwnerHash: string;
    IntellectualProperty: string;
    location: {
        solar_system_id: number,
        station_id: number | undefined,
        structure_id: number | undefined,
    };
    portrait: string;

    static async fromToken(authenticatorService: AuthenticatorService): Promise<Character> {
        const response = await authenticatorService.requestWithAuth(
            'get',
            'https://login.eveonline.com/oauth/verify'
        );
        const characterData = {
            ...response.body,
            ExpiresOn: new Date((response.body as any).ExpiresOn)
        };
        const character = Object.assign(new Character, characterData);
        character.authenticatorService = authenticatorService;
        return character;
    }

    async getLocation(): Promise<Character> {
        const response = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/characters/${this.CharacterID}/location/`
          );
          this.location = (response.body as any);
          return this;
    }

    async getPortrait(): Promise<Character> {
        const response = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/characters/${this.CharacterID}/portrait/`
          );
          this.portrait = (response.body as any).px128x128;
          console.log(this.portrait);
          return this;
    }

}
