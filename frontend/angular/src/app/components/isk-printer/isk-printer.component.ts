import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-isk-printer',
  templateUrl: './isk-printer.component.html',
  styleUrls: ['./isk-printer.component.css']
})
export class IskPrinterComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

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
  ) { }

  ngOnInit(): void {
  }

  public printIsk() {
    console.log('running...');
    console.log('done.');
  }

}
