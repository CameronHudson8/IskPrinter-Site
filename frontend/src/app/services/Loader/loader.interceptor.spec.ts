import { TestBed } from '@angular/core/testing';

import { Interceptor } from './loader.interceptor';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Interceptor = TestBed.get(Interceptor);
    expect(service).toBeTruthy();
  });
});
