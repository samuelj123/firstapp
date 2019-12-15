import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, KPI, Task } from '../project.model';
import { UserService } from 'src/app/user/user.service';
import { SavedialogueComponent } from 'src/app/shared/deldialogue/savedialogue.component';

@Component({
  selector: 'app-activeproj',
  templateUrl: './activeproj.component.html',
  styleUrls: ['./activeproj.component.css']
})
export class ActiveprojComponent implements OnInit {

  constructor(
    private projservice: ProjectsService,
    private uservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  project: Project;
  projid: string;
  kpis: KPI[];
  chain = ['Content Creation', 'Content Delivery', 'Marketing', 'Audience Relations'];
  userrole: string;
  startdate: string;
  toadd: number[] = [];
  budget: number;
  toadd2: number[] =[];
  fundsraised: number;
  ndate: Date; // Project Start Date (in language Angular can understand)
  tasks: Task[]
  taskscompleted: Task[];
  displaydeactivate: boolean = false;
  enddate: number;

  async ngOnInit() {
    await this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.userrole = await this.uservice.currentuserrole();
    this.project.kpis.map(x => this.toadd.push(x.budget));
    this.budget = this.toadd.reduce((a, b) => a + b, 0)
    this.project.fundraising.map(x => this.toadd2.push(x.amount));
    this.fundsraised = this.toadd2.reduce((a, b) => a + b, 0)
    this.tasks=await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];
    this.tasks.sort((a,b)=>{return a.duration - b.duration})
    this.taskscompleted=this.tasks.filter(x=>x.complete===true);
    this.getenddate();
  }

  getenddate() {
    let allenddates = [];
    this.tasks.forEach (x=>{
      allenddates.push(x.enddate);
    })
    this.enddate = Math.max(...allenddates);
  }

  show() {this.displaydeactivate = true;}
  hide() {this.displaydeactivate=false;}
  async deactivate() {
    const pe = {"approvallevel": 1, "startdate":null};
    await this.projservice.updateproj(pe, this.projid).toPromise() as Project;
    this.goback();
  }
  goback() {
    this.router.navigateByUrl('/projects');
  }

}
