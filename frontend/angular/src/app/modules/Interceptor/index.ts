import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from '../../services/loader/loader.service';
import { Interceptor } from './interceptor.module';

@NgModule({
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
})
export class LoaderModule { }

export * from '../../services/loader/loader.service';
