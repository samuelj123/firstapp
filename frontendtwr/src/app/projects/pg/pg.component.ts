import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { PGroup } from '../project.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.css']
})
export class PGComponent implements OnInit {
  pgForm: FormGroup;
  location = ['Urban', 'Rural', 'Unknown'];
  mypg: PGroup;
  pgid: string;
  needds: string[] = [];
  maccessibility = ['Radio', 'TV', 'Media players', 'SW/Radio']

  constructor(
    private projservice: ProjectsService,
    private fb: FormBuilder,
    private uservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  async ngOnInit() {
    this.route.params.subscribe(params => this.pgid = (params.id));
    this.pgForm = this.fb.group({
	  pgroup: ['', Validators.required],
      description: ['', Validators.required],
      agegrouplow: ['', Validators.required],
      agegrouphigh: ['', Validators.required],
      needs: this.fb.array([this.fb.group({ need: this.fb.control('') })]),
      population: ['', Validators.required],
      electricityaccess: ['', Validators.required],
      literacyrate: ['', Validators.required],
      location: ['', Validators.required],
      averageincome: ['', Validators.required],
      maccess:['', Validators.required]
    });

    if (this.pgid !== undefined) {
      this.mypg = await this.projservice.getonepg(this.pgid).toPromise() as PGroup;
      this.pgForm.patchValue({
        pgroup: this.mypg.pgroup,
        description: this.mypg.description,
        agegrouplow: this.mypg.agegrouplow,
        agegrouphigh: this.mypg.agegrouphigh,
        population: this.mypg.population,
        electricityaccess: this.mypg.electricityaccess,
        literacyrate: this.mypg.literacyrate,
        location: this.mypg.location,
        averageincome: this.mypg.averageincome,
				maccess: this.mypg.maccess,
      });
      console.log(this.mypg.needs[0].need);
      this.mypg.needs.forEach(val => {
        this.needds.push(val.need);
        this.pgForm.setControl('needs[i].need', this.setneeds(this.needds))
      })
    }
  }

  setneeds(needs: string[]): FormArray {
    const fa = new FormArray([]);
    console.log(needs);
    needs.forEach(k => fa.push(this.fb.group({need: k})));
    return fa;

  }

  get needs() {
    return this.pgForm.get('needs') as FormArray;
  }
  addNeed() {
    this.needs.push(this.fb.group({ need: [''] }));
  }
  delNeed(i: number) {
    return this.needs.controls.splice(i, 1);
  }


  async onSubmit() {
    const data = await this.uservice.currentusercountry();
    this.pgForm.value.country = data;
    const value: PGroup = this.pgForm.value;
    this.projservice.addpg(value).subscribe();
    this.router.navigateByUrl('/pgroup')
  }

}
