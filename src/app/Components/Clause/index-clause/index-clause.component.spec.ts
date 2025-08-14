import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClauseComponent } from './index-clause.component';

describe('IndexClauseComponent', () => {
  let component: IndexClauseComponent;
  let fixture: ComponentFixture<IndexClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexClauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
