import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCountryComponent } from './index-country.component';

describe('IndexCountryComponent', () => {
  let component: IndexCountryComponent;
  let fixture: ComponentFixture<IndexCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCountryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
