import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ActiveprojComponent } from './activeproj.component';
import { ProjectsService } from '../projects.service';
import { UserService } from 'src/app/user/user.service';
import { Dateadd2 } from 'src/app/pipes/dateadd2.pipe';
import { Dateadd } from 'src/app/pipes/dateadd.pipe';
import { sortPipe } from 'src/app/pipes/sort.pipe';
import { Project } from '../project.model';

describe('ActiveprojComponent', () => {
  let component: ActiveprojComponent;
  let fixture: ComponentFixture<ActiveprojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveprojComponent, Dateadd2, Dateadd, sortPipe ],
      imports: [RouterTestingModule],
      providers: [
        {provide: ProjectsService, useClass: ProjserviceStub},
        {provide: UserService, useClass: UserviceStub},
      ],


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveprojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});

class UserviceStub {
  currentuserrole(){};
}
class ProjserviceStub {
  async getoneproj(){};
}