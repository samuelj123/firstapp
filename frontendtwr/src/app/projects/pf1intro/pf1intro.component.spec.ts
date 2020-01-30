import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf1introComponent } from './pf1intro.component';

describe('Pf1introComponent', () => {
  let component: Pf1introComponent;
  let fixture: ComponentFixture<Pf1introComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf1introComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf1introComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//   it('should create', () => {
	//     expect(component).toBeTruthy();
	//   });
});
