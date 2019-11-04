import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Fundraising } from '../project.model';

@Component({
  selector: 'app-pf6fundraising',
  templateUrl: './pf6fundraising.component.html',
  styleUrls: ['./pf6fundraising.component.css']
})
export class Pf6fundraisingComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private projservice: ProjectsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  projid: string;
  project: Project;
  fraising: Fundraising[];
  fraisingform: FormGroup;
  toadd: number[] = [];
  totalfunds: number;

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    // this.fraising = await this.projservice.getfraisingbyproj(this.projid).toPromise() as Fundraising[];

    this.fraisingform = this.fb.group({
      'fundraising': this.fb.array([
        this.initX()
      ])
    });
  }


  initX() {
    return this.fb.group({
      'method': ['X', [Validators.required,]],
      'amount': ['', [Validators.required]],
      'pointperson': ['', [Validators.required]],
    });
  }


  addX() {
    const control = <FormArray>this.fraisingform.controls['fundraising'];
    control.push(this.initX());
  }

  total() {
    this.toadd = [];
    this.fraisingform.value.fundraising.map(x => this.toadd.push(x.amount));
    this.totalfunds = this.toadd.reduce((a, b) => a + b)
  }

  async savefile() {
    let value = this.fraisingform.value.fundraising;
    let vl = []
    for (let i = 0; i < value.length; i++) {
      let val = {
        method: value[i].method,
        amount: value[i].amount,
        pointperson: value[i].pointperson,
        project: this.projid,
      }
      vl.push(val);
    }
    await this.projservice.newfundraising(vl).toPromise();
  }
  async submit() {
    await this.savefile();
    this.router.navigateByUrl('/pf7reporting/' + this.projid);
  }
  async onDraft() {
    let value = this.fraisingform.value.fundraising;
    let vl = []
    for (let i = 0; i < value.length; i++) {
      let val = {
        method: value[i].method,
        amount: value[i].amount,
        pointperson: value[i].pointperson,
        project: this.projid,
      }
      vl.push(val);
    }
    await this.projservice.newfundraising(vl).toPromise();
    this.router.navigateByUrl('/projects');
  }

}