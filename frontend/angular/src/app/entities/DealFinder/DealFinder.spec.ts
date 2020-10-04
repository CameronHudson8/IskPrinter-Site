
import { DealFinder } from './DealFinder';
import { HttpResponse } from '@angular/common/http';

import { FakeLocalStorage } from './FakeLocalStorage';
import { AuthenticatorInterface } from '../../services/authenticator/authenticator.interface';
import happyVolumeHistory from './happyVolumeHistory.json';

describe('DealFinder', () => {

  let stubAuthenticatorService: AuthenticatorInterface = {
    requestWithAuth: (method: string, url: string, options?: any) =>  {
      return new Promise<HttpResponse<Object>>((resolve: (value?: HttpResponse<Object>) => void, reject: (reason?: any) => void) => {});
    }
  };

  let fakeLocalStorage;
  let dealFinder
  beforeEach(() => {
    fakeLocalStorage = new FakeLocalStorage();
    dealFinder = new DealFinder(stubAuthenticatorService, fakeLocalStorage);
  });

  it('should properly categorize historical volume', () => {
    const analyzedHistory = dealFinder.analyzeHistory(happyVolumeHistory);
    console.log(analyzedHistory);
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');
    console.log('ANALYZING HISTORY');

    expect(dealFinder).toBeTruthy();
  });

});
