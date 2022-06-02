import { TestBed } from '@angular/core/testing';

import { Innocomments22Service } from './innocomments22.service';

describe('Innocomments22Service', () => {
  let service: Innocomments22Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Innocomments22Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
