import { Component } from '@angular/core';
import { SimpleSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { AuthenticatorService } from 'src/app/services/authenticator/authenticator.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public authenticatorService: AuthenticatorService, 
    public loaderService: LoaderService,
  ) { }

  // onSubmit(): void {
  //   this.http.post(`${location.origin}/api/tokens`, this.loginForm.value, { observe: 'response' })
  //     .subscribe(
  //       response => {
  //       },
  //       error => {
  //         console.error(error);
  //         const snackbar: MatSnackBarRef<SimpleSnackBar> = this.errorMessage.open(
  //           error.error ? `${error.status}: ${error.error}` : error.message,
  //           'Dismiss', {
  //             duration: 8000,
  //           });
  //         snackbar.onAction().subscribe(() => {
  //           snackbar.dismiss();
  //         });
  //       }
  //     );

  // }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return;
  }

}
