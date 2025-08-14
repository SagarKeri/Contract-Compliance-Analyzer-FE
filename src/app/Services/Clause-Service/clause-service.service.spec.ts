import { TestBed } from '@angular/core/testing';

import { ClauseServiceService } from './clause-service.service';

describe('ClauseServiceService', () => {
  let service: ClauseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClauseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
