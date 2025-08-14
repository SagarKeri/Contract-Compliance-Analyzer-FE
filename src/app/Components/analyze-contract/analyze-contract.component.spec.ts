import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeContractComponent } from './analyze-contract.component';

describe('AnalyzeContractComponent', () => {
  let component: AnalyzeContractComponent;
  let fixture: ComponentFixture<AnalyzeContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
