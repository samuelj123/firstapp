import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeldialogueComponent } from './deldialogue.component';

describe('DeldialogueComponent', () => {
  let component: DeldialogueComponent;
  let fixture: ComponentFixture<DeldialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeldialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeldialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
