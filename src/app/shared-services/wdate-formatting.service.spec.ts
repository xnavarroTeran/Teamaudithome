import { TestBed } from '@angular/core/testing';

import { WdateFormattingService } from './wdate-formatting.service';

describe('WdateFormattingService', () => {
  let service: WdateFormattingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WdateFormattingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
