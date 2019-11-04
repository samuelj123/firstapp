import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf6fundraisingComponent } from './pf6fundraising.component';

describe('Pf6fundraisingComponent', () => {
  let component: Pf6fundraisingComponent;
  let fixture: ComponentFixture<Pf6fundraisingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf6fundraisingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf6fundraisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
