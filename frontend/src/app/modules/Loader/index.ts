import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Loader } from './loader.service';
import { Interceptor } from './loader.interceptor';

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

export * from './loader.service';
