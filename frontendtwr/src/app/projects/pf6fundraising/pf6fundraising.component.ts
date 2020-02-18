import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { UserService } from '../../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Fundraising } from '../project.model';
import { User } from '../../user/user.model';

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
		private uservice: UserService,
  ) { }
  projid: string;
  project: Project;
  fraising: Fundraising[];
  fraisingform: FormGroup;
  toadd: number[] = [];
  totalfunds: number;
	cuser: User;
	staff:User[];
  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.fraising = await this.projservice.getfraisingbyproj(this.projid).toPromise() as Fundraising[];
		this.cuser = await this.uservice.currentuser().toPromise() as User;
		this.staff = await this.uservice.getallbyfilter(this.cuser.id).toPromise() as User[];
    this.fraisingform = this.fb.group({
      'fundraising': this.fb.array([
        this.initX()
      ])
    });
    this.fraisingform.setControl('fundraising', this.setfraising(this.fraising));
  }


  initX() {
    return this.fb.group({
      'method': ['', [Validators.required,]],
      'amount': ['', [Validators.required]],
      'pointperson': ['', [Validators.required]],
    });
  }


  addX() {
    const control = <FormArray>this.fraisingform.controls['fundraising'];
    control.push(this.initX());
  }

  setfraising(fraising: Fundraising[]):FormArray {
    const fa = new FormArray([]);
    fraising.forEach(k => {
      fa.push(this.fb.group({
				method: k.method,
				amount: k.amount,
				pointperson: k.pointperson.id
      }))
    });
    return fa;
  }
  total() {
    this.toadd = [];
    this.fraisingform.value.fundraising.map(x => this.toadd.push(x.amount));
    this.totalfunds = this.toadd.reduce((a, b) => a + b)
  }


  get fraiser() {
    return this.fraisingform.get('fundraising') as FormArray;
  }
  deletefraiser(i: number) {
    this.fraiser.controls.splice(i, 1);
		this.fraisingform.value.fundraising.splice(i, 1)
  }
  async savefile() {
		this.fraising.forEach(x=> {
		this.projservice.deletefundraising(x.id).subscribe();
		} )
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
		this.ngOnInit();
  }

  async submit() {
    await this.savefile();
    this.router.navigateByUrl('/pf7reporting/' + this.projid);
  }

}
