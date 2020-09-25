import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-isk-printer',
  templateUrl: './isk-printer.component.html',
  styleUrls: ['./isk-printer.component.css']
})
export class IskPrinterComponent implements OnInit {

  public character: any;

  constructor(
    public authenticatorService: AuthenticatorService,
    private http: HttpClient,
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.authenticatorService.isLoggedIn()) {
      const character = await this.getCharacter();
      this.character = character;
    }
  }

  public async printIsk() {
    console.log('running...');
    console.log('done.');
  }

  public async getCharacter(): Promise<any> {

    const headers = {
      Authorization: `Bearer ${this.authenticatorService.getAccessToken()}`
    };
    const response = await this.http.get('https://login.eveonline.com/oauth/verify', { headers, observe: 'response' })
      .toPromise();
    const rawCharacter = (response as any).body;
    const character = {
      ...rawCharacter,
      ExpiresOn: new Date(rawCharacter.ExpiresOn)
    }
    return character;

  }

}