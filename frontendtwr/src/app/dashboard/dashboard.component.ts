import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { Project, PGroup, Task } from '../projects/project.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private projservice: ProjectsService, private uservice: UserService, private router: Router) { }
  projects: Project[];
  draftprojects: Project[];
  pendingprojects: Project[];
  activeprojects: Project[];
  pgroups: PGroup[];
  country: string;
  userrole: string;
  countryusers: User[];
  usertasks: Task[];
  alltasks: Task[];
  lateprojects: Project[];
  upcomingtasks: Task[];
  user: User;
  latetasks: Task[] = [];
  async ngOnInit() {
    // Determine Who the User IS
    this.user = await this.uservice.currentuser().toPromise() as User;
    // Get All Colleagues in Users' Country
    this.countryusers = await this.uservice.getallbyfilter(this.user.id).toPromise() as User[]
    // Figure out Which country User is from
    this.country = await this.uservice.currentusercountry() as string;
    // Get all the Projects relevant to User
    if (this.country === 'Singapore') {
      this.projects = await this.projservice.getallproj().toPromise() as Project[];
      this.pgroups = await this.projservice.getallpg().toPromise() as PGroup[];
    } else {
      this.projects = await this.projservice.getfilteredproj(this.country).toPromise() as Project[];
      this.pgroups = await this.projservice.getfilteredpg(this.country).toPromise() as PGroup[];
    }
    // Determine the Role of the User
    this.userrole = await this.uservice.currentuserrole();
    // Determine all Active Projects in Users' country
    this.activeprojects = this.projects.filter(x => x.approvallevel === 2);
    // Determine all Tasks in Users' Purview
    let atask = this.activeprojects.map(async x => {
      let task = await this.projservice.gettasksinproj(x.id).toPromise() as Task[];
      let projstartdate = new Date(x.startdate).getTime();
      task.forEach(x => { x.projstartdate = projstartdate})
      return [...task]
    })
    let alltasks = await Promise.all(atask);
    this.alltasks = [].concat.apply([], alltasks);
    // Determine upcoming Tasks
    this.upcomingtasks = this.alltasks.filter(x=>{
      const today = Date.now();
      if (x.projstartdate<=today+(5*1000*24*5)) {
        return;
      }
    })
    // Determine Draft Projects And Pending Projects
    this.draftprojects = this.projects.filter(x => x.approvallevel === 0);
    this.pendingprojects = this.projects.filter(x => x.approvallevel === 1);
    this.usertasks = this.user.tasks.filter(x => x.kpi.project.approvallevel === 2);
    this.usertasks.forEach(x=>{x.realdeadline=new Date(x.kpi.project.startdate).getTime()+x.enddate})
    const el = this.usertasks.map(x => { return x.enddate }); // el em en oo to make latetasks
    const em = this.usertasks.map(x => { return x.kpi })
    const en = em.map(x => { return x.project.startdate })
    const oo = en.map(x => { return new Date(x).getTime(); })
    let today = Date.now();
    for (var i; i === this.usertasks.length; i++) {
      let deadline = oo[i - 1] + (el[i - 1] * 1000 * 24 * 365);
      if (deadline > today) {
        this.latetasks.push(this.usertasks[i - 1])
      }
    };

  }
}
