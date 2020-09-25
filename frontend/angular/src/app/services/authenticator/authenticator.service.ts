import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private LOGIN_SERVER_DOMAIN_NAME = 'login.eveonline.com';

  private accessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.accessToken = window.localStorage.getItem('accessToken');
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  public getLoginUrl(): string {
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
    return `https://${this.LOGIN_SERVER_DOMAIN_NAME}/oauth/authorize`
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

  public async getAccessTokenFromCode(code: string): Promise<string> {
    const body = {
      code,
      clientId: environment.clientId
    };
    const response = await this.http.post(`${environment.backendUrl}/tokens`, body, { observe: 'response' })
      .toPromise();
    
    this.setAccessToken((response.body as any).accessToken);
    return this.accessToken;
  }

  public getAccessToken(): string {
    const accessToken = this.accessToken || window.localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token exists.');
    }
    return accessToken;
  }

  private setAccessToken(accessToken: string): void {
    if (!accessToken) {
      throw new Error("Expected response body to contain accessToken, but it didn't.");
    }
    this.accessToken = accessToken;
    window.localStorage.setItem('accessToken', accessToken);
  }

}
