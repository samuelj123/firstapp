import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveprojComponent } from './activeproj.component';

describe('ActiveprojComponent', () => {
  let component: ActiveprojComponent;
  let fixture: ComponentFixture<ActiveprojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveprojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
