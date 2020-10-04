import { HttpResponse } from '@angular/common/http';
import { AuthenticatorInterface } from '../services/authenticator/authenticator.interface';
import { DealFinder } from './DealFinder';

describe('DealFinder', () => {

  let stubAuthenticatorService: AuthenticatorInterface = {
    requestWithAuth: (method: string, url: string, options?: any) =>  {
      return new Promise<HttpResponse<Object>>((resolve: (value?: HttpResponse<Object>) => void, reject: (reason?: any) => void) => {});
    }
  };

  let dealFinder = new DealFinder(stubAuthenticatorService, );

  beforeEach(() => {
  });

  it('should create', () => {
    expect(dealFinder).toBeTruthy();
  });

});
