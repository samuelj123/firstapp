import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Project, Task, KPI } from '../project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-pf6tasks',
  templateUrl: './pf6tasks.component.html',
  styleUrls: ['./pf6tasks.component.css'],
})

export class Pf6tasksComponent implements OnInit {

  constructor(private projservice: ProjectsService, private route: ActivatedRoute, private uservice: UserService, private router: Router) { }

  projid: string;
  dataSource: Task[];
  edit = '';
  cuid: User;
  kpi: KPI[];
  kpiid: string;
  chain = ['Content Creation', 'Content Delivery', 'Marketing', 'Audience Relations'];
  project: Project;
  pplresponsible: User[];


  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.cuid = await this.uservice.currentuser().toPromise() as User;
    this.kpi = await this.projservice.getkpibyprojwithtasks(this.projid).toPromise() as KPI[];
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.pplresponsible = await this.uservice.getallbyfilter(this.cuid.id).toPromise() as User[];
    console.log(this.kpi)
  }

  getform(id, task) { // Brings up the Input Form
    this.edit = id + task;
  }

  async removeform(id, e) {
    this.edit = 'bleh'; // Just to hide the input form.
    const key = e.target.name;
    const value = e.target.value;
    const object = { [key]: value };
    await this.projservice.updatetask(id, object).toPromise();
    setTimeout(() => {
      this.ngOnInit;
    },
      5000)
  }
  async addincharge(id, e) {
    this.edit = 'bleh';
    await this.projservice.updatetaskincharge(e.target.value, id).toPromise();

  }
  async ontab(id, e, a) {
    await this.removeform(id, e);
    this.getform(id, a);
  }


  async addTask(id: string) {
    const btask: Task = { task: 'notask', duration: 0, pointperson: 'noperson', enddate: 1 };
    this.kpiid = id;
    await this.projservice.newtask(id, btask).toPromise();
    this.ngOnInit();
  }

  async deleteTask(id) {
    await this.projservice.deletetask(id).toPromise();
      this.ngOnInit();
  }

  async submitproject() {
    this.router.navigateByUrl('/pf6fundraising/' + this.projid);
  }

  async reviewproject() {
    this.router.navigateByUrl('/viewproj/' + this.projid);
  }

  async onDraft() {
    // this.router.navigateByUrl('/projects');
  }
}

