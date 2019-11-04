import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf2objectivesComponent } from './pf2objectives.component';

describe('Pf2objectivesComponent', () => {
  let component: Pf2objectivesComponent;
  let fixture: ComponentFixture<Pf2objectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf2objectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf2objectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
