import { TestBed } from '@angular/core/testing';

import { PastAnalysisServiceService } from './past-analysis-service.service';

describe('PastAnalysisServiceService', () => {
  let service: PastAnalysisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastAnalysisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
