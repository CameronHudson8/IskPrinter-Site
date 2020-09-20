import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-code-receiver',
  templateUrl: './code-receiver.component.html',
  styleUrls: ['./code-receiver.component.css']
})
export class CodeReceiverComponent implements OnInit {

  constructor(
    public authenticatorService: AuthenticatorService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const parsedUrl = this.router.parseUrl(this.router.url);
    if (parsedUrl.queryParams.code) {
      this.authenticatorService.getAccessToken(parsedUrl.queryParams.code);
    } else {
      console.error('No code found in URL.');
    }
  }
  
}
