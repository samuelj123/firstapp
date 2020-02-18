import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Pf3contentdeliveryComponent } from './pf3contentdelivery.component';
import { ProjectsService } from '../projects.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Pf3contentdeliveryComponent', () => {
  let component: Pf3contentdeliveryComponent;
  let fixture: ComponentFixture<Pf3contentdeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ Pf3contentdeliveryComponent ],
			providers: [{provide: ProjectsService, useClass: ProjServStub}],
      imports: [
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pf3contentdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//	it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});
class ProjServStub{
}
