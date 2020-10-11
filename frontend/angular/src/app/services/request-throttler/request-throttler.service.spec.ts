import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { RequestThrottlerService } from './request-throttler.service';

describe('RequestThrottlerService', () => {
  let service: RequestThrottlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(RequestThrottlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
