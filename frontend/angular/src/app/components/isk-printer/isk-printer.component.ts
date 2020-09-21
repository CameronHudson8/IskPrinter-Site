import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-isk-printer',
  templateUrl: './isk-printer.component.html',
  styleUrls: ['./isk-printer.component.css']
})
export class IskPrinterComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public character: any;
  public dataSource: {
    position: number,
    name: string,
    weight: number,
    symbol: string,
  }[] = [
    {
      position: 1,
      name: 'Hydrogen',
      weight: 1.0079,
      symbol: 'H'
    },
    {
      position: 2,
      name: 'Helium',
      weight: 4.0026,
      symbol: 'He'
    },
    {
      position: 3,
      name: 'Lithium',
      weight: 6.941,
      symbol: 'Li'
    },
    {
      position: 4,
      name: 'Beryllium',
      weight: 9.0122,
      symbol: 'Be'
    },
    {
      position: 5,
      name: 'Boron',
      weight: 10.811,
      symbol: 'B'
    },
    {
      position: 6,
      name: 'Carbon',
      weight: 12.0107,
      symbol: 'C'
    },
    {
      position: 7,
      name: 'Nitrogen',
      weight: 14.0067,
      symbol: 'N'
    },
    {
      position: 8,
      name: 'Oxygen',
      weight: 15.9994,
      symbol: 'O'
    },
    {
      position: 9,
      name: 'Fluorine',
      weight: 18.9984,
      symbol: 'F'
    },
    {
      position: 10,
      name: 'Neon',
      weight: 20.1797,
      symbol: 'Ne'
    },
  ];

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
