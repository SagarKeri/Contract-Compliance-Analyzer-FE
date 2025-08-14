import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGenieComponent } from './contract-genie.component';

describe('ContractGenieComponent', () => {
  let component: ContractGenieComponent;
  let fixture: ComponentFixture<ContractGenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractGenieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractGenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
