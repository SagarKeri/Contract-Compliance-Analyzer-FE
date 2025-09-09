import { TestBed } from '@angular/core/testing';

import { ContractCacheServiceService } from './contract-cache-service.service';

describe('ContractCacheServiceService', () => {
  let service: ContractCacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractCacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
