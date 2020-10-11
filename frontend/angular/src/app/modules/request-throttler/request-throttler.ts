import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RequestThrottler implements HttpInterceptor {

  private readonly THROTTLE_LIMIT = 8;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

}
