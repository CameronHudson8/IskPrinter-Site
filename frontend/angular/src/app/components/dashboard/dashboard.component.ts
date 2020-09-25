import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(
    public authenticatorService: AuthenticatorService,
  ) { }

  ngOnInit(): void {
  }

}
