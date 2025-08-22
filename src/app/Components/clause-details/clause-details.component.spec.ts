import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseDetailsComponent } from './clause-details.component';

describe('ClauseDetailsComponent', () => {
  let component: ClauseDetailsComponent;
  let fixture: ComponentFixture<ClauseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClauseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClauseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
