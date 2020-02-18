import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Pf2objectivesComponent } from './pf2objectives.component';
import { ProjectsService } from '../projects.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Pf2objectivesComponent', () => {
  let component: Pf2objectivesComponent;
  let fixture: ComponentFixture<Pf2objectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf2objectivesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf2objectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create pf2', () => {
    //expect(component).toBeTruthy();
  //});
});

