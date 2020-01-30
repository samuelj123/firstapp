import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf4marketingComponent } from './pf4marketing.component';

describe('Pf4marketingComponent', () => {
  let component: Pf4marketingComponent;
  let fixture: ComponentFixture<Pf4marketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf4marketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf4marketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
