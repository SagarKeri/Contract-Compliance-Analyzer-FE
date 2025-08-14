import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComplianceComponent } from './index-compliance.component';

describe('IndexComplianceComponent', () => {
  let component: IndexComplianceComponent;
  let fixture: ComponentFixture<IndexComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
