import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

export class Character {

    authenticatorService: AuthenticatorService;

    id: number;
    name: string;
    expiresOn: Date;
    location: {
        solar_system_id: number,
        solar_system_name: string,
        station_id: number | undefined,
        structure_id: number | undefined,
        structure_name: string | undefined,
    };
    portrait: string;

    constructor(authenticatorService: AuthenticatorService) {
        this.authenticatorService = authenticatorService;
    };

    async getId(): Promise<Character> {
        const response = await this.authenticatorService.requestWithAuth(
            'get',
            'https://login.eveonline.com/oauth/verify'
        );
        const characterData: any = response.body;
        this.id = characterData.CharacterID;
        this.name = characterData.CharacterName;
        this.expiresOn = new Date(characterData.ExpiresOn)
        return this;
    }

    async getLocation(): Promise<Character> {
        const characterLocationResponse = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/characters/${this.id}/location/`
        );
        this.location = (characterLocationResponse.body as any);

        const solarSystemInfoResponse = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/universe/systems/${this.location.solar_system_id}`
        );
        this.location.solar_system_name = (solarSystemInfoResponse.body as any).name;

        if (!this.location.structure_id) {
            return this;
        }

        const structureInfoResponse = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/universe/structures/${this.location.structure_id}`
        );
        this.location.structure_name = (structureInfoResponse.body as any).name;

        return this;
    }

    async getPortrait(): Promise<Character> {
        const response = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/characters/${this.id}/portrait/`
          );
          this.portrait = (response.body as any).px128x128;
          return this;
    }

}
