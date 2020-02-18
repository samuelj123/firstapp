import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { UserService } from '../../user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { shiftInitState } from '@angular/core/src/view';
import {User} from '../../user/user.model';

@Component({
  selector: 'app-pf7reporting',
  templateUrl: './pf7reporting.component.html',
  styleUrls: ['./pf7reporting.component.css']
})
export class Pf7reportingComponent implements OnInit {

  projid: string;
  project: Project;
  myForm: FormGroup;
	staff: User[]
  constructor(public uservice: UserService, public projservice: ProjectsService, public router: Router, public route: ActivatedRoute, public fb: FormBuilder) { }


  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
		const cuser = await this.uservice.currentuser().toPromise() as User;
		this.staff = await this.uservice.getallbyfilter(cuser.id).toPromise() as User[];
  }

  async uploadr(e) {
    if (e.key === 'Tab') { 
      const val = {report: e.target.value}
		console.log(val)
      await this.projservice.updatekpi(e.target.name, val).toPromise();
    }
  }
  async uploadpp(e) {
    if (e.key === 'Tab') { 
      const val = {pointperson: e.target.value}
			console.log(val)
			await this.projservice.updatekpi(e.target.name, val).toPromise();
    }
  }
  
  async uploadblr(e) {
    const val = {report: e.target.value}
		console.log(val)
		await this.projservice.updatekpi(e.target.name, val).toPromise();
  }
  async uploadblpp(e) {
    const val = {pointperson: e.target.value}
		console.log(val)
    await this.projservice.updatekpi(e.target.name, val).toPromise();
  }
  async submit() {
    this.router.navigate(['/pf8budget/' + this.projid]);
  }
  async draft() {
    // this.router.navigate(['/projects']);
  }

  async reviewproject() {
    this.router.navigateByUrl('/viewproj/' + this.projid);
  }
}
