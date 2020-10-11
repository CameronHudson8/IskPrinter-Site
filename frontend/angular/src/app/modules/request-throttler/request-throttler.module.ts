import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestThrottlerService } from 'src/app/services/request-throttler/request-throttler.service';
import { RequestThrottler } from './request-throttler';

@NgModule({
  providers: [
    RequestThrottlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestThrottler,
      multi: true
    }
  ]
})
export class RequestThrottlerModule { }
