import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInformer } from './request-informer';
import { RequestInformerService } from 'src/app/services/request-informer/request-informer.service';

@NgModule({
  providers: [
    RequestInformerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInformer,
      multi: true
    }
  ]
})
export class LoaderModule { }
