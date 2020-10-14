import { TestBed } from '@angular/core/testing';

import { RequestThrottler } from './request-throttler';

describe('RequestThrottler', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestThrottler = TestBed.get(RequestThrottler);
    expect(service).toBeTruthy();
  });
});
