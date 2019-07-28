import { TestBed } from '@angular/core/testing';

import { Loader } from './loader.service';

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Loader = TestBed.get(Loader);
    expect(service).toBeTruthy();
  });
});
