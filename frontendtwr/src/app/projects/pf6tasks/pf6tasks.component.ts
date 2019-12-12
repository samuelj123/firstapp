import { Component, OnInit } from '@angular/core';
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
  dataSource: Task[];
  edit = '';
  cuid: User;
  kpi: KPI[];
  chain = [
    {name: 'Content Creation', object:'Content Creation'},
    {name: 'Content Delivery', object:'Content Delivery'}, 
    {name: 'Marketing', object:'Marketing'}, 
    {name: 'Audience Relations', object: 'Audience Relations'}
  ];
  project: Project;
  pplresponsible: User[];
  taskform: FormGroup;
  tasks: FormArray
  alltasks: Task[];
  


  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.cuid = await this.uservice.currentuser().toPromise() as User;
    this.kpi = await this.projservice.getkpibyprojwithtasks(this.projid).toPromise() as KPI[];
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.alltasks = await this.projservice.gettasksinproj(this.projid).toPromise() as Task[];
    this.pplresponsible = await this.uservice.getallbyfilter(this.cuid.id).toPromise() as User[];

    this.taskform = this.fb.group({
      task: this.fb.array([this.atask()])
    });
    this.tasks = this.taskform.get('task') as FormArray;
    this.taskform.setControl('task', this.settasks(this.alltasks));
    console.log(this.alltasks)
  }


  atask(): FormGroup {
    return this.fb.group({
      taskname: '',
      category: '',
      taskhandler: '',
      duration: '',
      enddate: '',
      kpiid: ''
    });
  }

  settasks(tasks: Task[]):FormArray {
    const fa = new FormArray([]);
    tasks.forEach(k => {
      fa.push(this.fb.group({
        taskname: k.task, 
        category: k.kpi.type, 
        taskhandler: k.taskhandler.id, 
        duration: k.duration, 
        enddate: k.enddate,
        kpiid: k.kpi.id
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

  async savetasks() {
    const fv = this.taskform.get('task')['controls'];
    const fv1:number = this.alltasks.length;
    const fv2 = fv.filter(function(x, i) {
        return i > fv1-1 && x.dirty === true;
    })
    fv2.forEach(async x => {
      const obj = {
        task: x.value.taskname as string,
        duration: x.value.duration as number,
        enddate: x.value.enddate as number,
        taskhandler: x.value.taskhandler as string,
      };
      console.log(x.value.kpiid);
        await this.projservice.newtask(x.value.kpiid, obj).toPromise();
    })
    const fv4 = this.alltasks;
    const fv3 = fv.filter(x => {
      return !fv2.includes(x) && x.dirty === true;
    })
    fv3.forEach(async (x, i) => {
      const obj = {
        task: x.value.taskname,
        duration: x.value.duration,
        enddate: x.value.enddate,
        taskhandler: x.value.taskhandler,
      };
      await this.projservice.updatetask(fv4[i].id, obj).toPromise();
    })

    return this.ngOnInit();

  }

  async next() {
    this.savetasks();
    await this.router.navigateByUrl('/pf6fundrdaising/' + this.projid);
  }

  async draft() {
    this.savetasks();
    await this.router.navigateByUrl('/projects');
  }
}

