import { TestBed } from '@angular/core/testing';

import { WigoconfigsService } from './wigoconfigs.service';

describe('WigoconfigsService', () => {
  let service: WigoconfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WigoconfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
