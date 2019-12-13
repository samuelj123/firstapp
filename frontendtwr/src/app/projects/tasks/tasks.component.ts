import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Project, Task } from '../project.model';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { DenydialogueComponent } from 'src/app/shared/deldialogue/denydialogue.component';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private projservice: ProjectsService, private uservice: UserService, private router: Router) { }

  tasks: Task[];
  cuser: User;

  async ngOnInit() {
    this.cuser = await this.uservice.currentuser().toPromise() as User;
    this.tasks = await this.projservice.gettasksbyuser(this.cuser.id).toPromise() as Task[];
    console.log(this.tasks);
  }

  async tick(id, e) {
    if (e.target.checked) {
      await this.projservice.updatetask(id, {complete: true}).toPromise() as Task;
      const bleh = await this.projservice.gettasksbyuser(this.cuser.id).toPromise() as Task[]
      console.log(e.target.checked);
    } else {
      await this.projservice.updatetask(id, {complete: false}).toPromise() as Task;
      const bleh = await this.projservice.gettasksbyuser(this.cuser.id).toPromise() as Task[]
      console.log('bleh')
    }
  }

}
