import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComplianceComponent } from './edit-compliance.component';

describe('EditComplianceComponent', () => {
  let component: EditComplianceComponent;
  let fixture: ComponentFixture<EditComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
