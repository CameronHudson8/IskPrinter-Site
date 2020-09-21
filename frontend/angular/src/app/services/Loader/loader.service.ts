import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private DEFAULT_VALUE = false;
  public isLoading = new BehaviorSubject<boolean>(this.DEFAULT_VALUE);

  constructor() { }

}
