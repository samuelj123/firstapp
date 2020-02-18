import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { PGroup, Language } from '../project.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.css']
})
export class PGComponent implements OnInit {
  pgForm: FormGroup;
  location = ['Urban', 'Rural', 'Both'];
  mypg: PGroup;
  pgid: string;
  needds: string[] = [];
  maccessibility = ['Radio', 'TV', 'Media players', 'SW/Radio'];
  languages: Language[];

  constructor(
    private projservice: ProjectsService,
    private fb: FormBuilder,
    private uservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  async ngOnInit() {
    this.route.params.subscribe(params => this.pgid = (params.id));
    this.languages = await this.projservice.getlanguages().toPromise() as Language[];
    this.pgForm = this.fb.group({
			pgroup: ['', Validators.required],
      description: ['', Validators.required],
      population: ['', Validators.required],
      electricityaccess: ['', Validators.required],
      agegrouplow: ['', Validators.required],
      agegrouphigh: ['', Validators.required],
      literacyrate: ['', Validators.required],
      location: ['', Validators.required],
      averageincome: ['', Validators.required],
      mediaaccess:['', Validators.required],
			language: ['', Validators.required],
      needs: this.fb.array([this.fb.group({ need: this.fb.control('') })])
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
        averageincome: this.mypg.averageincome,
      });
      this.mypg.needs.forEach(val => {
        this.needds.push(val.need);
        this.pgForm.setControl('needs', this.setneeds(this.needds))
      })
      this.pgForm.get('mediaaccess').setValue(this.mypg.mediaaccess);
      this.pgForm.get('language').setValue(this.mypg.language.id);
      this.pgForm.get('location').setValue(this.mypg.location);
    }

  }

  setneeds(needs: string[]): FormArray {
    const fa = new FormArray([]);
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
    return this.needs.removeAt(i);
  }


  async onSubmit() {
    const data = await this.uservice.currentusercountry();
    this.pgForm.value.country = data;
    const value: PGroup = this.pgForm.value;
		value.needs = value.needs.filter(x => {return x.need!==''} )
		if(!this.pgid){
			this.projservice.addpg(value).subscribe();
		}else{
			this.projservice.updatepg(this.pgid, value).subscribe();
		}
    this.router.navigateByUrl('/pgroup')
  }

}
