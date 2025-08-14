import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClauseComponent } from './edit-clause.component';

describe('EditClauseComponent', () => {
  let component: EditClauseComponent;
  let fixture: ComponentFixture<EditClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
