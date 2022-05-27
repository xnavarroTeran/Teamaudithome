import { TestBed } from '@angular/core/testing';

import { FindingsServiceService } from './findings-service.service';

describe('FindingsServiceService', () => {
  let service: FindingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
