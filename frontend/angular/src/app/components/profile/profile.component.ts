import { Component, OnInit } from '@angular/core';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';
import { Character } from 'src/app/entities/Character';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public character: any;

  constructor(
    public authenticatorService: AuthenticatorService,
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.authenticatorService.isLoggedIn()) {
      const character = await Character.fromToken(this.authenticatorService);
      this.character = character;
      await Promise.all([
        this.character.getLocation(),
        this.character.getPortrait()
      ]);
    }
  }

}
