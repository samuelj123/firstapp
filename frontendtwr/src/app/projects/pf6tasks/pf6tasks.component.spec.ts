import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf6tasksComponent } from './pf6tasks.component';

describe('Pf6tasksComponent', () => {
  let component: Pf6tasksComponent;
  let fixture: ComponentFixture<Pf6tasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf6tasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf6tasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
