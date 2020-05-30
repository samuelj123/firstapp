import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, KPI, Task } from '../project.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-viewproj',
  templateUrl: './viewproj.component.html',
  styleUrls: ['./viewproj.component.css']
})
export class ViewprojComponent implements OnInit {

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
  toadd: number[] = [];
  budget: number;
  toadd2: number[] =[];
  fundsraised: number;
  tasks: Task[];
	dte: Date;
	approvetoggle:boolean = false;
	denytoggle:boolean = false;



  async ngOnInit() {
    await this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.kpis = this.project.kpis;
		this.dte = new Date(this.project.startdate);
    this.userrole = await this.uservice.currentuserrole();
    this.project.budget.forEach(x => this.toadd.push(x.amount));
    this.budget = this.toadd.reduce((a, b) => a + b, 0)
    this.project.fraising.map(x => this.toadd2.push(x.amount));
    this.fundsraised = this.toadd2.reduce((a, b) => a + b, 0)
    this.tasks = await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];
		this.modifytasks(this.tasks);
		console.log(this.project);
  }

	modifytasks(tasks:Task[]) {
		tasks.forEach(x=> {return x.startdate = new Date(this.dte.getTime() + (x.startdate*1000*60*60*24)).toISOString().substring(0,10)})
		tasks.forEach(x=> {return x.enddate = new Date(this.dte.getTime() + (x.enddate*1000*60*60*24)).toISOString().substring(0,10)})
	}

  starttoggle(id) {
    this.approvetoggle = true;
  }
	cancel() {
		this.approvetoggle = false;
		this.denytoggle = false;
	}
  async approveproj(e) {
    const day = e.target.value.split("-", 3);
    const date: Date = new Date(day[0], day[1], day[2])
    const object = { approvallevel: 2, startdate: e.target.value };
		console.log(day);
    await this.projservice.updateproj(object, this.projid).subscribe();
    this.router.navigateByUrl('/projects');
  }

	deniestoggle(id) {
		this.denytoggle = true;
	}
  async denyproject(e) {
    const object = { approvallevel: 0, denialmsg: e.target.value };
    await this.projservice.updateproj(object, this.projid).subscribe();
    this.router.navigateByUrl('/projects');
  }
  goback() {
    this.router.navigateByUrl('/projects');
  }

  async submitproject() {
    const val = { approvallevel: 1 }
    const val2 = { denialmsg: null };
    this.projservice.updateproj({...val, ...val2}, this.projid).subscribe();
    this.router.navigate(['/projects']);
    this.ngOnInit();
    //OpenDialog
  //   const dialogRef = this.dialog.open(SavedialogueComponent, {
  //     width: '250px',
  //     data: { id: this.project.id, string: this.project.name, associated: '' }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === undefined) { } else {
  //       const val1 = { approvallevel: 1 };
  //       const val2 = {denialmsg: null };
  //       const value = {...val1, ...val2}
  //       this.projservice.updateproj(value, this.projid).subscribe();
  //       this.router.navigate(['/projects']);
  //       this.ngOnInit();
  //     }
  //   });
  }
}
