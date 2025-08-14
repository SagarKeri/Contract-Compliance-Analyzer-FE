import { TestBed } from '@angular/core/testing';

import { ContractAnalysisServiceService } from './contract-analysis.service.service';

describe('ContractAnalysisServiceService', () => {
  let service: ContractAnalysisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractAnalysisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
