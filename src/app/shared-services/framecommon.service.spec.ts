import { TestBed } from '@angular/core/testing';

import { FramecommonService } from './framecommon.service';

describe('FramecommonService', () => {
  let service: FramecommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FramecommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
