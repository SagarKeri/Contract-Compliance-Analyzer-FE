import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplianceComponent } from './create-compliance.component';

describe('CreateComplianceComponent', () => {
  let component: CreateComplianceComponent;
  let fixture: ComponentFixture<CreateComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
