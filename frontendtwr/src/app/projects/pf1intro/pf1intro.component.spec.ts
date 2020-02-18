import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Pf1introComponent } from './pf1intro.component';
import { ProjectsService } from '../projects.service';
import { UserService } from 'src/app/user/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Pf1introComponent', () => {
  let component: Pf1introComponent;
  let fixture: ComponentFixture<Pf1introComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pf1introComponent ],
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      providers: [
        {provide: ProjectsService, useClass: ProjServStub},
        {provide: UserService, useClass: UserviceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf1introComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it('should create', () => {
    //expect(component).toBeTruthy();
  //});
});

class UserviceStub{}
class ProjServStub{
	getallpg(){}
}
