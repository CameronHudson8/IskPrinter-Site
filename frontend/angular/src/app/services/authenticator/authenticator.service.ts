import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private accessToken: string;

  constructor(
    private location: Location,
    private router: Router,
  ) {

    const parsedUrl = this.router.parseUrl(this.location.path());
    if (parsedUrl.queryParams.access_token) {
      window.localStorage.setItem('accessToken', parsedUrl.queryParams.access_token);
    }
    if (window.localStorage.getItem('accessToken')) {
      this.accessToken = window.localStorage.getItem('accessToken');
    }

  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  public getLoginUrl(): string {
    const loginServerBaseUrl = 'login.eveonline.com';
    const responseType = 'code';
    const scopes = [
      'esi-location.read_location.v1',
      'esi-skills.read_skills.v1',
      'esi-wallet.read_character_wallet.v1',
      'esi-clones.read_clones.v1',
      'esi-assets.read_assets.v1',
      'esi-markets.structure_markets.v1',
      'esi-markets.read_character_orders.v1',
      'esi-characterstats.read.v1',
    ];
    const state = undefined;
    return `https://${loginServerBaseUrl}/oauth/authorize`
        + `?response_type=${responseType}`
        + `&redirect_uri=${environment.frontendUrl}/code-receiver/`
        + `&client_id=${environment.clientId}`
        + `&scope=${scopes.join(' ')}`
        + `${state ? `&state={state}` : ''}`;
  }

  public logOut(): void {
    window.localStorage.removeItem('accessToken');
    this.accessToken = undefined;
    this.router.navigate(['']);
  }

  public async getAccessToken(code: string): Promise<void> {

    this.router.navigate(['']);
  }

}
