import { TestBed } from '@angular/core/testing';

import { RequestInformer } from './request-informer';

describe('RequestInformer', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestInformer = TestBed.get(RequestInformer);
    expect(service).toBeTruthy();
  });
});
