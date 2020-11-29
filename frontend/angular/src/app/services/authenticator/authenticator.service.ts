import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatorInterface } from './authenticator.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticatorService implements AuthenticatorInterface {

  private accessToken: string;
  private frontendUrl: string;
  private backendUrl: string;
  public loginUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.accessToken = window.localStorage.getItem('accessToken');
    this.frontendUrl = `${window.location.protocol}//${window.location.host}`;
    this.fetchEnvVar('BACKEND_URL')
      .then((backendUrl) => {
        this.backendUrl = backendUrl;
        return this.fetchLoginUrl();
      })
      .then((loginUrl) => this.loginUrl = loginUrl);
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  private async fetchLoginUrl(): Promise<string> {
    const params = { 'callback-url': `${this.frontendUrl}/code-receiver/` };
    const response = await this.http.get(`${this.backendUrl}/login-url`, { observe: 'response', params })
      .toPromise();
    return (response.body as any).loginUrl;
  }

  private async fetchEnvVar(varName: string): Promise<string> {
    if (!environment.packaged) {
      return environment[varName];
    }
    const response = await this.http.get(`${this.frontendUrl}/env/${varName}`, { observe: 'response' })
      .toPromise();
    return (response.body as string);
  }

  logOut(): void {
    window.localStorage.removeItem('accessToken');
    this.accessToken = undefined;
    this.router.navigate(['']);
  }

  async getAccessTokenFromCode(code: string): Promise<string> {
    const body = {
      code
    };
    const response = await this.http.post(`${this.backendUrl}/tokens`, body, { observe: 'response' })
      .toPromise();

    this.setAccessToken((response.body as any).accessToken);
    return this.accessToken;
  }

  async renewAccessToken(accessToken: string): Promise<string> {
    const body = { accessToken };
    let response;
    try {
      response = await this.http.post(`${this.backendUrl}/tokens`, body, { observe: 'response' })
        .toPromise();
    } catch (error) {
      if (error.status === 404) {
        this.logOut();
        throw error;
      }
    }
    this.setAccessToken((response.body as any).accessToken);
    return this.accessToken;
  }

  public async requestWithAuth(method: string, url: string, options?: any): Promise<HttpResponse<Object>> {
    const doRequest = async () => this.http.request(
      method,
      url,
      {
        body: options?.body,
        headers: new HttpHeaders({
          ...options?.headers,
          Authorization: `Bearer ${this.getAccessToken()}`,
        }),
        observe: 'response',
        params: options?.params,
        responseType: 'json'
      }
    ).toPromise();

    try {
      return await doRequest();
    } catch (error) {
      if (![401, 403].includes(error.status)) {
        console.error(JSON.stringify(error));
        throw error;
      }
    }
    this.accessToken = await this.renewAccessToken(this.accessToken);
    return await doRequest();
  }

  getAccessToken(): string {
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

  async backendRequest(method: string, uri: string, options?: any): Promise<HttpResponse<Object>> {
    return this.http.request(
      method,
      `${this.backendUrl}${uri}`,
      {
        body: options?.body,
        headers: new HttpHeaders({
          ...options?.headers,
        }),
        observe: 'response',
        params: options?.params,
        responseType: 'json'
      }
    ).toPromise();
  }

}
