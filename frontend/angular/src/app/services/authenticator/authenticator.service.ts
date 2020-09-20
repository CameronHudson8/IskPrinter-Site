import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private token: string;

  constructor() { }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

}
