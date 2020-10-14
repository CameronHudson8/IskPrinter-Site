import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';

import { RequestThrottlerService } from 'src/app/services/request-throttler/request-throttler.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RequestThrottler implements HttpInterceptor {

  private static readonly THROTTLE_LIMIT = 5;

  private requestsInProgress: number = 0;
  private requestQueue: [
    Subscriber<HttpEvent<any>>,
    Observable<HttpEvent<any>>,
    Subscription
  ][] = [];

  constructor(
    private requestThrottler: RequestThrottlerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`requestsInProgress = ${this.requestsInProgress}`);
    console.log(`queuedRequests = ${this.requestQueue.length}`);

    return new Observable<HttpEvent<any>>((observer) => {
      const observable = next.handle(req);
      const subscription = new Subscription;

      this.requestQueue.push([observer, observable, subscription]);

      if (this.requestsInProgress < RequestThrottler.THROTTLE_LIMIT) {
        this.startNewRequestLoop();
      }
      return () => subscription.unsubscribe();
    });
  }

  async startNewRequestLoop() {
    this.requestsInProgress += 1;

    while (this.requestQueue.length > 0) {

      const [observer, observable, subscription] = this.requestQueue.shift();

      if (subscription.closed) {
        continue;
      }

      try {
        const response = await observable.toPromise();
        observer.next(response);
      } catch (err) {
        observer.error(err);
      } finally {
        observer.complete();
      }

    }

    this.requestsInProgress -= 1;
  }

}
