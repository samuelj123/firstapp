import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
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

  constructor(private projservice: ProjectsService, 
    private route: ActivatedRoute, 
    private uservice: UserService,
    private router: Router,
    private fb: FormBuilder) { }

  projid: string;
  cuid: User;
  kpi: KPI[];
	ctgry:string[] = ['Content Creation', 'Content Delivery', 'Marketing', 'Audience Relations', 'Fundraising', 'Reporting'];
  project: Project;
  pplresponsible: User[];
  taskform: FormGroup;
  tasks: FormArray
	atasks: Task[]; //all tasks in Project
	alltasks: Task[]; //all tasks in Category
	dte: Date;

	@Input() 
	nextpage: string;
	@Input()
	category: string;

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.cuid = await this.uservice.currentuser().toPromise() as User;
    this.kpi = await this.projservice.getkpibyprojwithtasks(this.projid).toPromise() as KPI[];
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
		this.dte = new Date(this.project.startdate);
    this.atasks = await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];
		this.alltasks = this.atasks.filter(x=> {return x.category ===this.category});
    this.pplresponsible = await this.uservice.getallbyfilter(this.cuid.id).toPromise() as User[];
    this.taskform = this.fb.group({
      task: this.fb.array([this.atask()])
    });
    this.tasks = this.taskform.get('task') as FormArray;
    this.taskform.setControl('task', this.settasks(this.alltasks));
  }


  atask(): FormGroup {
    return this.fb.group({
      taskname: '',
      startdate: '',
      enddate: '',
      taskhandler: '',
    });
  }

	getdate(k:number){
		const ddd = new Date(this.dte.getTime() + (k*1000*60*60*24)).toISOString().substring(0,10)
		return ddd;
	}
  settasks(tasks: Task[]):FormArray {
    const fa = new FormArray([]);
    tasks.forEach(k => {
      fa.push(this.fb.group({
        taskname: k.task, 
        taskhandler: k.taskhandler.id, 
        startdate: this.getdate(k.startdate),
        enddate: this.getdate(k.enddate),
        category: this.category
      }))
    });
    return fa;
  }

  addtask(id) {
    this.tasks = this.taskform.get('task') as FormArray;
    this.tasks.push(this.atask());
  }

  deletetask(i: number) {
    if (i <= this.alltasks.length -1 ) {
      let id = this.alltasks[i].id;
      this.projservice.deletetask(id).subscribe();
    } else {};
    this.tasks.controls.splice(i, 1);
    this.ngOnInit();
  }
	getdatenumber(k) {
		const ddd = (new Date(k).getTime() - this.dte.getTime())/(1000*60*60*24);
		return ddd
	}
  async savetasks() {
		this.atasks.forEach(x => {
			this.projservice.deletetask(x.id)
		})
		this.taskform.value.task.forEach(x=>{
			const obj = {
				task: x.taskname,
				category: this.category, 
				startdate: this.getdatenumber(x.startdate),
				enddate: this.getdatenumber(x.enddate),
				taskhandler: x.taskhandler
			}
			this.projservice.newtask(this.projid, obj).subscribe();
		})
  }

  async next() {
    // await this.savetasks();
    await this.router.navigateByUrl(this.nextpage);
  }

  async draft() {
    this.savetasks();
    await this.router.navigateByUrl('/projects');
  }
}

