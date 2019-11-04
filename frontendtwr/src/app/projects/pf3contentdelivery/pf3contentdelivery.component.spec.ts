import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pf3contentdeliveryComponent } from './pf3contentdelivery.component';

describe('Pf3contentdeliveryComponent', () => {
  let component: Pf3contentdeliveryComponent;
  let fixture: ComponentFixture<Pf3contentdeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf3contentdeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf3contentdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
