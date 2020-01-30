import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf7reportingComponent } from './pf7reporting.component';

describe('Pf7reportingComponent', () => {
  let component: Pf7reportingComponent;
  let fixture: ComponentFixture<Pf7reportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf7reportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf7reportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
