import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf5audiencerelationsComponent } from './pf5audiencerelations.component';

describe('Pf5audiencerelationsComponent', () => {
  let component: Pf5audiencerelationsComponent;
  let fixture: ComponentFixture<Pf5audiencerelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf5audiencerelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf5audiencerelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
