import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PGsComponent } from './pgs.component';

describe('PGsComponent', () => {
  let component: PGsComponent;
  let fixture: ComponentFixture<PGsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PGsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PGsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
