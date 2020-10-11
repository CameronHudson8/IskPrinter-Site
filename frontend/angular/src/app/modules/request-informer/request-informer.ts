import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestInformerService } from 'src/app/services/request-informer/request-informer.service';

/**
 * This class is based on the example by jornare on Stackoverflow.
 * https://stackoverflow.com/questions/49385369/angular-show-spinner-for-every-http-request-with-very-less-code-changes
 */
@Injectable({
  providedIn: 'root'
})
export class RequestInformer implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(
    private requestInformer: RequestInformerService,
  ) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    this.requestInformer.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    this.requests.push(req);
    this.requestInformer.isLoading.next(true);
    return new Observable((observer) => {
      const subscription = next.handle(req)
        .subscribe((event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
          (err) => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });
      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
