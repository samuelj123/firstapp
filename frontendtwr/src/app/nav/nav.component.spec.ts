import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [RouterTestingModule],
      providers:[
        {provide: UserService, useClass: Uservice}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	 it('should create', () => {
	   expect(component).toBeTruthy();
	 });
});

class Uservice{
  currentuser() {}
}