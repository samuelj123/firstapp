import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, KPI } from '../project.model';

@Component({
  selector: 'app-pf4marketing',
  templateUrl: './pf4marketing.component.html',
  styleUrls: ['./pf4marketing.component.css']
})
export class Pf4marketingComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private projservice: ProjectsService,
    private route: ActivatedRoute,
    private router: Router, ) { }

  // global variables

  projid: string;
  project: Project;
  myForm: FormGroup;
  myeditedproj: Project;
  markpis: KPI[];

  // Content Marketing Variables
  mmethods: string[] = ['Flyers', 'Posters', 'Advertisements', 'Calendars', 'Church Meetings', 'Public Meetings', 'Radio Home Network', 'Trainings', 'Facebook Ads', 'Google Ads', 'Cross-Promotion on Radio', 'Cross-Promotion online'];

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.markpis = await this.projservice.getkpibyproj(this.projid).toPromise() as KPI[];
    this.myForm = this.fb.group({
      marketingmethod: ['', Validators.required],
      marketingkpis: this.fb.array([this.fb.control('')]),
    });

    this.myeditedproj = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.myForm.patchValue({marketingmethod: this.project.marketingmethod})
    this.markpis = this.markpis.filter(val => val.type==='Marketing')
		this.markpis.sort((a,b)=>(a.created>b.created)?1:-1)
    this.myForm.setControl('marketingkpis', this.setkpis(this.markpis));

  }


  // Marketing KPI
  get marketingkpis() {
    return this.myForm.get('marketingkpis') as FormArray;
  }
  setkpis(kpi: KPI[]): FormArray {
    const fa = new FormArray([]);
    console.log(kpi);
    kpi.forEach(k => {if(k.type==='Marketing'){fa.push(this.fb.control(k.kpi ))}});
    return fa;
  }
  addMarketingkpi() {
    this.marketingkpis.push(this.fb.control(''));
  }
  deletemarketingkpi(i: number) {
    if (i <= this.markpis.length -1 ) {
      let id = this.markpis[i].id;
      this.projservice.deletekpi(id).subscribe();
    }
    this.marketingkpis.controls.splice(i, 1);
  }


  //SUbmitting STuff
  async savefile() {
    let fv = this.myForm.value;
    let fv2 = this.myForm.value.marketingkpis;
    let fc = this.myForm.get('marketingkpis')['controls'];
    const { marketingkpis, ...value } = fv;
    this.projservice.updateproj(value, this.projid).subscribe();
    let vl = [];
    for (let i = 0; i < fc.length; i++) {
      if (fc[i].dirty === true) {
        let val = {
          type: 'Marketing',
          project: this.projid,
          kpi: fv2[i],
        };
        vl.push(val);
      }
    }
    this.projservice.newkpi(vl).subscribe();
  }
  // async onSubmit() {
  //   await this.savefile();
  //   await this.router.navigateByUrl('/pf5audiencerelations/' + this.projid);
  // }
  // async onDraft() {
  //   await this.savefile();
  //   await this.router.navigateByUrl('/projects');
  // }
}

