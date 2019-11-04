import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalnavComponent } from './proposalnav.component';

describe('ProposalnavComponent', () => {
  let component: ProposalnavComponent;
  let fixture: ComponentFixture<ProposalnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
