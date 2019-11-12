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
  projects:Project[];
  pendingprojects: Project[];
  activeprojects: Project[];
  pgroups: PGroup[];
  country: string;
  userrole: string;
  usertasks: Task[];
  user: User;
  async ngOnInit() {
    this.country = await this.uservice.currentusercountry() as string;
    if(this.country === 'Singapore') {
      this.projects = await this.projservice.getallproj().toPromise() as Project[];
      this.pgroups = await this.projservice.getallpg().toPromise() as PGroup[];
    } else {
      this.projects = await this.projservice.getfilteredproj(this.country).toPromise() as Project[];
       this.pgroups = await this.projservice.getfilteredpg(this.country).toPromise() as PGroup[];
    }
    this.userrole = await this.uservice.currentuserrole();
    this.activeprojects = this.projects.filter(x => x.startdate!==null);
    this.pendingprojects = this.projects.filter(x=>x.startdate===null);
    this.user = await this.uservice.currentuser().toPromise() as User;
    console.log(this.user);
  }
}
