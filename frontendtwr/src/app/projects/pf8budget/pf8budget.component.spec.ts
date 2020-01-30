import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf8budgetComponent } from './pf8budget.component';

describe('Pf8budgetComponent', () => {
  let component: Pf8budgetComponent;
  let fixture: ComponentFixture<Pf8budgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf8budgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf8budgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
