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
    HttpRequest<any>,
    HttpHandler,
    Subscription
  ][] = [];

  constructor(
    private requestThrottler: RequestThrottlerService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(`requestsInProgress = ${this.requestsInProgress}`);
    console.log(`queuedRequests = ${this.requestQueue.length}`);

    return new Observable<HttpEvent<any>>((observer) => {

      if (this.requestsInProgress < RequestThrottler.THROTTLE_LIMIT) {
        const subscription = this.doTheThing(observer, req, next);
        return () => subscription.unsubscribe();
      }

      const futureSubscription = new Subscription();
      this.requestQueue.push([observer, req, next, futureSubscription]);

      return () => {
        console.log('unsubscribing...');
        futureSubscription.unsubscribe();
      }
    });
  }

  processNextRequest(): void {

    const [observer, req, next, futureSubscription] = this.requestQueue.shift();

    if (futureSubscription.closed) {
      return;
    }

    const subscription = this.doTheThing(observer, req, next);
    futureSubscription.unsubscribe = subscription.unsubscribe;

  }

  doTheThing(observer: Subscriber<HttpEvent<any>>, req: HttpRequest<any>, next: HttpHandler): Subscription {
    this.requestsInProgress += 1;
    const subscription = next.handle(req).subscribe(
      (response) => observer.next(response),
      (err) => observer.error(err),
      () => {
        observer.complete();
        this.requestsInProgress -= 1;

        if (this.requestQueue.length > 0) {
          this.processNextRequest();
        }

      }
    );
    return subscription;
  }

}
