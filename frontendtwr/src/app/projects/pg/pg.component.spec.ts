import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PGComponent } from './pg.component';

describe('PGComponent', () => {
  let component: PGComponent;
  let fixture: ComponentFixture<PGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
