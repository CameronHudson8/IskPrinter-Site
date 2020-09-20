import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-isk-printer',
  templateUrl: './isk-printer.component.html',
  styleUrls: ['./isk-printer.component.css']
})
export class IskPrinterComponent implements OnInit {

  constructor(
    public authenticatorService: AuthenticatorService, 
  ) { }

  ngOnInit(): void {
  }

}
