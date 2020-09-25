import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticatorService {

  private LOGIN_SERVER_DOMAIN_NAME = 'login.eveonline.com';

  private accessToken: string;
  private loginUrl: string

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.accessToken = window.localStorage.getItem('accessToken');
    this.fetchLoginUrl()
        .then((loginUrl) => this.loginUrl = loginUrl);
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  public getLoginUrl(): string {
    return this.loginUrl;
  }

  private async fetchLoginUrl(): Promise<string> {
    const params = { 'callback-url': `${environment.frontendUrl}/code-receiver/` };
    const response = await this.http.get(`${environment.backendUrl}/login-url`, { observe: 'response', params })
      .toPromise();
    return (response.body as any).loginUrl;
  }

  public logOut(): void {
    window.localStorage.removeItem('accessToken');
    this.accessToken = undefined;
    this.router.navigate(['']);
  }

  public async getAccessTokenFromCode(code: string): Promise<string> {
    const body = {
      code
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
