import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private jwt: string;
  private accessToken: string;
  private refreshToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public isLoggedIn(): boolean {
    return !!this.accessToken && !!this.refreshToken;
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
    return new Promise((resolve, reject) => {
      // const body = 
      this.http.post(`${environment.backendUrl}/api/tokens`, {
        code,
        clientId: environment.clientId
      },
      {
        observe: 'response'
      })
        .subscribe((response) => {

          const { access_token, refresh_token } = response['body' as any];

          if (access_token && refresh_token) {
            this.jwt = response['body' as any];
            this.accessToken = access_token;
            this.refreshToken = refresh_token;
            window.localStorage.setItem('jwt', JSON.stringify(this.jwt));
            window.localStorage.setItem('accessToken', access_token);
            window.localStorage.setItem('refreshToken', refresh_token);
            return resolve();
          }
          return reject(new Error("Expected response body to contain access_token and refresh_token, but it didn't."));

        }, (error) => reject(error));

    });
      
    
  }

}
