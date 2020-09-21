import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

/**
 * This class is based on the example by jornare on Stackoverflow.
 * https://stackoverflow.com/questions/49385369/angular-show-spinner-for-every-http-request-with-very-less-code-changes
 */
@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(
    private loaderService: LoaderService,
  ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
