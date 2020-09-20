import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Begin Material setup, per https://material.angular.io/guide/getting-started */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
/* End Material setup */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModule } from 'src/app/modules/Interceptor';

import { NavComponent } from 'src/app/components/nav/nav.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { TreeComponent } from 'src/app/components/tree/tree.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { IskPrinterComponent } from './components/isk-printer/isk-printer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    TableComponent,
    TreeComponent,
    PageNotFoundComponent,
    IskPrinterComponent,
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
