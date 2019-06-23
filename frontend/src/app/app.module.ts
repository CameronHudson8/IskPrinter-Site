import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Begin Material setup, per https://material.angular.io/guide/getting-started */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatInputModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatTreeModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
/* End Material setup */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'src/app/modules/Loader';

import { NavComponent } from 'src/app/components/nav/nav.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { TreeComponent } from 'src/app/components/tree/tree.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    TableComponent,
    TreeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,

    /* Begin Material setup */
    BrowserAnimationsModule,
    BrowserModule, // Must be imported before any Mat*Module module.
    LayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    /* End Material setup */

    FormsModule,
    HttpClientModule,
    LoaderModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
