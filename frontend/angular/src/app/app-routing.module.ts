import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeReceiverComponent } from './components/code-receiver/code-receiver.component';
import { IskPrinterComponent } from './components/isk-printer/isk-printer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IskPrinterComponent },
  { path: 'isk-printer', component: IskPrinterComponent },
  { path: 'code-receiver', component: CodeReceiverComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
