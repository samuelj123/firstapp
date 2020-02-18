import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../language.service';
import { LanguageComponent } from './language.component';
import {RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Language} from 'src/app/projects/project.model';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageComponent ],
			providers: [
				{provide: LanguageService, useClass: LService},
			],
			imports: [RouterTestingModule, ReactiveFormsModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

	//  it('should create', () => {
	//    expect(component).toBeTruthy();
	//  });
});

class LService {
	getalllang(){
	}
}
