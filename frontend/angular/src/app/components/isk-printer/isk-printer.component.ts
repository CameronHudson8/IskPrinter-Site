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
    const character = await this.getCharacter();
    this.character = character;
  }

  public async printIsk() {
    console.log('running...');
    console.log('done.');
  }

  public async getCharacter(): Promise<any> {

    try {

      return new Promise((resolve, reject) => {
        this.http.get(
          `https://login.eveonline.com/oauth/verify`,
          {
            headers: {
              Authorization: `Bearer ${this.authenticatorService.getAccessToken()}`
            },
            observe: 'response'
          }
        )
          .subscribe(
            (response) => {
              const rawCharacter: any = response.body;
              const character = {
                ...rawCharacter,
                ExpiresOn: new Date(rawCharacter.ExpiresOn)
              }
              resolve(character)
            },
            (error) => reject(error)
          );
  
      });

    } catch (error) {
      console.error(error);
    }

  }

}
