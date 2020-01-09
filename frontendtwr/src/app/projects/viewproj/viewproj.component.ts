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



  async ngOnInit() {
    await this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.kpis = this.project.kpis;
    this.userrole = await this.uservice.currentuserrole();
    this.project.kpis.map(x => this.toadd.push(x.budget));
    this.budget = this.toadd.reduce((a, b) => a + b, 0)
    this.project.fundraising.map(x => this.toadd2.push(x.amount));
    this.fundsraised = this.toadd2.reduce((a, b) => a + b, 0)
    this.tasks = await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];
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
