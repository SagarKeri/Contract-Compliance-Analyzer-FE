import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClauseComponent } from './create-clause.component';

describe('CreateClauseComponent', () => {
  let component: CreateClauseComponent;
  let fixture: ComponentFixture<CreateClauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClauseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateClauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
