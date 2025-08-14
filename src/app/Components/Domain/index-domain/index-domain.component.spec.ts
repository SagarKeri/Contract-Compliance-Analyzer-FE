import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDomainComponent } from './index-domain.component';

describe('IndexDomainComponent', () => {
  let component: IndexDomainComponent;
  let fixture: ComponentFixture<IndexDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDomainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
