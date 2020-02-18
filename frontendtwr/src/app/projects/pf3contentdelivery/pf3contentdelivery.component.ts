import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, KPI } from '../project.model';

@Component({
  selector: 'app-pf3contentdelivery',
  templateUrl: './pf3contentdelivery.component.html',
  styleUrls: ['./pf3contentdelivery.component.css']
})
export class Pf3contentdeliveryComponent implements OnInit {

  constructor(private fb: FormBuilder, private projservice: ProjectsService, private route: ActivatedRoute, private router: Router, ) { }

  // global variables

  projid: string;
  project: Project;
  myForm: FormGroup;
  diskpis: KPI[];

  // Content Distribution Specific
  disttype = ['Radio', 'Digital', 'Analogue'];
  dmethod = [['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'],
  ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App']]

  // Content Distribution Select 
  public onChange(e, i: number): void {
    if (e.value === 'Radio') {
      this.dmethod[i] = ['SW', 'FM', 'MW'];
    } else if (e.value === 'Analogue') {
      this.dmethod[i] = ['SD Card', 'CD', 'Media Player'];
    } else if (e.value === 'Digital') {
      this.dmethod[i] = ['TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging', 'App'];
    } else {
      this.dmethod[i] = ['SW', 'FM', 'MW', 'SD Card', 'CD', 'Media Player', 'TWR 360', 'Local Website', 'Youtube', 'Facebook', 'Instant Messaging'];
    }
  }

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.diskpis = await this.projservice.getkpibyproj(this.projid).toPromise() as KPI[];
    this.myForm = this.fb.group({
      distmethod: this.fb.array([this.fb.control('')]),
      distributionkpis: this.fb.array([this.fb.control('')]),
    });

    this.diskpis = this.diskpis.filter(val => val.type === 'Content Delivery')
		this.diskpis.sort((a,b)=>(a.updated>b.updated)?1:-1)
    this.myForm.setControl('distributionkpis', this.setkpis(this.diskpis));
		this.myForm.setControl('distmethod', this.setdmethod(this.project.distmethod));
  }

  get distmethod() {
    return this.myForm.get('distmethod') as FormArray;
  }
  get distributionkpis() {
    return this.myForm.get('distributionkpis') as FormArray;
  }

  // Distribution KPI Getter

  setkpis(kpi: KPI[]): FormArray {
    const fa = new FormArray([]);
    kpi.forEach(k => { if (k.type === 'Content Delivery') { fa.push(this.fb.control(k.kpi)) } });
    return fa;
  }
  addDistributionkpi() {
    this.distributionkpis.push(this.fb.control(''));
  }
  deletedistributionkpi(i: number) {
    if (i <= this.diskpis.length - 1) {
      let id = this.diskpis[i].id;
      this.projservice.deletekpi(id).subscribe();
    }
    this.distributionkpis.controls.splice(i, 1);
  }

  
  setdmethod(dmethod: string[]): FormArray {
    const fa = new FormArray([]);
    dmethod.forEach(k => fa.push(this.fb.control(k)));
    return fa;
  }
  addDmethod() {
    this.distmethod.push(this.fb.control(''));
    console.log()
  }
  deleteDmethod(i: number) {
    // if (i <= this.project.distmethod.length - 1) {
    this.distmethod.controls.splice(i, 1);
    // }
  }


  async savefile() {
    let fv = this.myForm.value;
    let fv2 = this.myForm.value.distributionkpis;
    let fc = this.myForm.get('distributionkpis')['controls'];
    const { distributionkpis, ...value } = fv;
    this.projservice.updateproj(value, this.projid).subscribe();
    let vl = [];
    for (let i = 0; i < fc.length; i++) {
      if (fc[i].dirty === true) {
        let val = {
          type: 'Content Delivery',
          project: this.projid,
          kpi: fv2[i],
        };
        vl.push(val);
      }
    }
    this.projservice.newkpi(vl).subscribe();
  }

  async onSubmit() {
    await this.savefile();
    await this.router.navigateByUrl('/pf4marketing/' + this.projid);
  }
  async onDraft() {
    await this.savefile();
		await this.router.navigateByUrl('/projects');
  }
}
