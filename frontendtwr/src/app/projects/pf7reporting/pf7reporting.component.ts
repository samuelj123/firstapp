import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '../project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { shiftInitState } from '@angular/core/src/view';

@Component({
  selector: 'app-pf7reporting',
  templateUrl: './pf7reporting.component.html',
  styleUrls: ['./pf7reporting.component.css']
})
export class Pf7reportingComponent implements OnInit {

  projid: string;
  project: Project;
  myForm: FormGroup;

  constructor(public projservice: ProjectsService, public router: Router, public route: ActivatedRoute, public fb: FormBuilder) { }


  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;

    this.project.kpis.map((x) => {
      const mf: string = x.id;
      this[mf] = this.fb.group({
        report: ['', Validators.required],
        pointperson: ['', Validators.required]
      });
    })
  }

  async uploadr(e) {
    if (e.key === 'Tab') { 
      const val = {report: e.target.value}
      await this.projservice.updatekpi(e.target.name, val).toPromise();
    }
  }
  async uploadpp(e) {
    if (e.key === 'Tab') { 
      const val = {pointperson: e.target.value}
      await this.projservice.updatekpi(e.target.name, val).toPromise();
    }
  }
  
  async uploadblr(e) {
    const val = {report: e.target.value}
    await this.projservice.updatekpi(e.target.name, val).toPromise();
  }
  async uploadblpp(e) {
    const val = {pointperson: e.target.value}
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
