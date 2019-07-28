import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Loader } from '../../services/Loader/loader.service';
import { Interceptor } from './interceptor.module';

@NgModule({
  providers: [
    Loader,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
})
export class LoaderModule { }

export * from '../../services/Loader/loader.service';
