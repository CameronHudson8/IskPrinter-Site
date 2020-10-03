import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

export class Character {

    authenticatorService: AuthenticatorService;

    id: number;
    name: string;
    expiresOn: Date;
    location: {
        solarSystemId: number,
        solarSystemName: string,
        stationId: number | undefined,
        structureId: number | undefined,
        structureName?: string | undefined,
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
        const locationData = characterLocationResponse.body as any;

        const solarSystemInfoResponse = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/universe/systems/${locationData.solar_system_id}`
        );
        const solarSystemData = solarSystemInfoResponse.body as any;

        this.location = {
            solarSystemId: locationData.solar_system_id,
            solarSystemName: solarSystemData.name,
            stationId: locationData.station_id,
            structureId: locationData.structure_id,
            structureName: locationData.structure_name,
        };

        if (!this.location.structureId) {
            return this;
        }

        const structureInfoResponse = await this.authenticatorService.requestWithAuth(
            'get',
            `https://esi.evetech.net/latest/universe/structures/${this.location.structureId}`
        );
        this.location.structureName = (structureInfoResponse.body as any).name;

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
