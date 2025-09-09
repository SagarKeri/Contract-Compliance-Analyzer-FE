import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAnalysisComponent } from './past-analysis.component';

describe('PastAnalysisComponent', () => {
  let component: PastAnalysisComponent;
  let fixture: ComponentFixture<PastAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
