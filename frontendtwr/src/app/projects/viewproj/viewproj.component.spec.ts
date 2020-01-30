import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprojComponent } from './viewproj.component';

describe('ViewprojComponent', () => {
  let component: ViewprojComponent;
  let fixture: ComponentFixture<ViewprojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
