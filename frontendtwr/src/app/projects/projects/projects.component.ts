import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { DenydialogueComponent } from 'src/app/shared/deldialogue/denydialogue.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(private projservice: ProjectsService, private uservice: UserService, private router: Router) { }

  projects: any;
  userrole: string;
  approvetoggle: boolean = false;
  denytoggle: boolean = false;
  denymessage: string;
  denyid: string;
  async ngOnInit() {
    const country = await this.uservice.currentusercountry() as string;
    if (country === 'Singapore') {
      this.projservice.getallproj().subscribe(val => this.projects = val);
    } else {
      this.projservice.getfilteredproj(country).subscribe(val => this.projects = val);
    }
    this.userrole = await this.uservice.currentuserrole();
  }

  deleteproj(id) {
    this.projservice.deleteproj(id).subscribe();
    this.ngOnInit();
  }
  editproj(id) {
    this.router.navigate(['/pf1intro/' + id]);
  }

  starttoggle(id) {
    this.approvetoggle = true;

  }
  async approveproj(id, e) {
    const day = e.target.value.split("-", 3);
    const date: Date = new Date(day[0], day[1], day[2])
    const object = { approvallevel: 2, startdate: date };
    await this.projservice.updateproj(object, id).subscribe();
    this.ngOnInit();
  }
  cancel() {
    this.approvetoggle = false;
    this.denytoggle = false;
  }
  async denyproj(id) {
    this.denytoggle = true;
    this.denyid=id;
  }
  async denyproj2() {
    const res = { denialmsg: this.denymessage };
    const obj = { approvallevel: 0 };
    const object = { ...res, ...obj };
    this.projservice.updateproj(object, this.denyid).subscribe();
    this.ngOnInit();
  }


  async newproj() {
    this.router.navigateByUrl('/pf1intro');
  }

  async viewproj(id) {
    this.router.navigateByUrl('/viewproj/' + id)
  }
  async activeproj(id) {
    this.router.navigateByUrl('/activeproj/' + id)
  }
}
