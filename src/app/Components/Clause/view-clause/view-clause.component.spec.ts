import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClauseComponent } from './view-clause.component';

describe('ViewClauseComponent', () => {
  let component: ViewClauseComponent;
  let fixture: ComponentFixture<ViewClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
