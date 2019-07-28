import { Component } from '@angular/core';
import { Loader } from 'src/app/services/Loader/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SimpleSnackBar, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private errorMessage: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient,
    public loaderService: Loader,
  ) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.http.post(`${location.origin}/api/tokens`, this.loginForm.value, { observe: 'response' })
      .subscribe(
        response => {
        },
        error => {
          console.error(error);
          const snackbar: MatSnackBarRef<SimpleSnackBar> = this.errorMessage.open(
            error.error ? `${error.status}: ${error.error}` : error.message,
            'Dismiss', {
              duration: 8000,
            });
          snackbar.onAction().subscribe(() => {
            snackbar.dismiss();
          });
        }
      );

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return;
  }

}
