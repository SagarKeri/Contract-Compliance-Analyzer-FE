import { TestBed } from '@angular/core/testing';

import { ComplianceServiceService } from './compliance-service.service';

describe('ComplianceServiceService', () => {
  let service: ComplianceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
