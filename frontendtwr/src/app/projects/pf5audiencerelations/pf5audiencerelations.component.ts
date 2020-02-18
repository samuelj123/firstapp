import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, KPI } from '../project.model';

@Component({
  selector: 'app-pf5audiencerelations',
  templateUrl: './pf5audiencerelations.component.html',
  styleUrls: ['./pf5audiencerelations.component.css']
})
export class Pf5audiencerelationsComponent implements OnInit {

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

  get audiencerelationskpis() {
    return this.myForm.get('audiencerelationskpis') as FormArray;
  }

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.markpis = await this.projservice.getkpibyproj(this.projid).toPromise() as KPI[];
    this.myForm = this.fb.group({
      audiencerelationskpis: this.fb.array([this.fb.control('')]),
    });
    this.markpis = this.markpis.filter(val => val.type==='Audience Relations');
		this.markpis.sort((a,b)=>(a.created<b.created)?1:-1)
    this.myForm.setControl('audiencerelationskpis', this.setkpis(this.markpis));
  }

  setkpis(kpi: KPI[]): FormArray {
    const fa = new FormArray([]);
    console.log(kpi);
    kpi.forEach(k => {if(k.type==='Audience Relations'){fa.push(this.fb.control(k.kpi ))}});
    return fa;
  }

  addAudiencerelationskpi() {
    this.audiencerelationskpis.push(this.fb.control(''));
  }
  deleteaudiencerelationskpi(i: number) {
    if (i <= this.markpis.length -1 ) {
      let id = this.markpis[i].id;
      this.projservice.deletekpi(id).subscribe();
    }
    this.audiencerelationskpis.controls.splice(i, 1);
  }
  async savefile() {
    let fv = this.myForm.value;
    let fv2 = this.myForm.value.audiencerelationskpis;
    let fc = this.myForm.get('audiencerelationskpis')['controls'];
    const { audiencerelationskpis, ...value } = fv;
    this.projservice.updateproj(value, this.projid).subscribe();
    let vl = [];
    for (let i = 0; i < fc.length; i++) {
      if (fc[i].dirty === true) {
        let val = {
          type: 'Audience Relations',
          project: this.projid,
          kpi: fv2[i],
        };
        vl.push(val);
      }
    }
    this.projservice.newkpi(vl).subscribe();
  }
  async onDraft() {
    await this.savefile();
    await this.router.navigateByUrl('/projects');
    
  }
  async onSubmit() {
    await this.savefile();
    await this.router.navigateByUrl('/pf6fundraising/' + this.projid);
  }
}
