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
      let subscription;
      if (this.requestsInProgress < RequestThrottler.THROTTLE_LIMIT) {
        subscription = this.executeRequest(observer, observable);
      } else {
        subscription = this.storeRequest(observer, observable);
      }
      return () => subscription.unsubscribe();
    });
  }

  executeRequest(observer: Subscriber<HttpEvent<any>>, observable: Observable<HttpEvent<any>>): Subscription {
    this.requestsInProgress += 1;
    const subscription = observable.subscribe(
      (response) => observer.next(response),
      (err) => observer.error(err),
      () => {
        observer.complete();
        this.requestsInProgress -= 1;

        if (this.requestQueue.length <= 0) {
          return;
        }
        const [observer2, observable2, futureSubscription2] = this.requestQueue.shift();
        if (futureSubscription2.closed) {
          return;
        }
        const subscription2 = this.executeRequest(observer2, observable2);
        futureSubscription2.unsubscribe = subscription2.unsubscribe;

      }
    );
    return subscription;
  }

  storeRequest(observer: Subscriber<HttpEvent<any>>, observable: Observable<HttpEvent<any>>): Subscription {
    const futureSubscription = new Subscription();
    this.requestQueue.push([observer, observable, futureSubscription]);
    return futureSubscription;
  }

}
