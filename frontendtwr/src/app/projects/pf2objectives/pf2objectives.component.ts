import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Project, KPI } from '../project.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pf2objectives',
  templateUrl: './pf2objectives.component.html',
  styleUrls: ['./pf2objectives.component.css']
})
export class Pf2objectivesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private projservice: ProjectsService,
    private route: ActivatedRoute,
    private router: Router, ) { }

  // Universal Variables
  projid: string;
  project: Project;
  myForm: FormGroup;

  // Content Production and Distribution Variables
  contentformat = ['Interview', 'Teaching', 'Drama', 'Music', 'Animation'];
  productionformat = ['Audio', 'Video'];

  // KPI Variables
  prodkpis: KPI[];
  myeditedproj: Project;



  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.prodkpis = await this.projservice.getkpibyproj(this.projid).toPromise() as KPI[];

    // Setting up the Form
    this.myForm = this.fb.group({

      programname: ['', Validators.required],
      duration: ['', Validators.required],
      contentformat: ['', Validators.required],
      programsno: ['', Validators.required],
      productionformat: ['', Validators.required],
      productionkpis: this.fb.array([this.fb.control('')]),

    });

    // Patching Values into the form in case of editing older projects
    this.myeditedproj = await this.projservice.getoneproj(this.projid).toPromise() as Project;
    this.myForm.patchValue({
      programname: this.myeditedproj.programname,
      duration: this.myeditedproj.duration,
      contentformat: this.myeditedproj.contentformat,
      programsno: this.myeditedproj.programsno,
      productionformat: this.myeditedproj.productionformat,
    });

    // Patching up KPIs into the form
    this.prodkpis = this.prodkpis.filter(val => val.type === 'Content Creation');
    this.myForm.setControl('productionkpis', this.setkpis(this.prodkpis));
  }
  // All KPI Related Functions
  // Getting KPI Arrays to Work - Getters
  get productionkpis() {
    return this.myForm.get('productionkpis') as FormArray;
  }
  setkpis(kpi: KPI[]): FormArray {
    const fa = new FormArray([]);
    kpi.forEach(k => { if (k.type === 'Content Creation') { fa.push(this.fb.control(k.kpi)) } });
    return fa;

  }
  addProductionkpi() {
    this.productionkpis.push(this.fb.control(''));
  }
  deleteproductionkpi(i: number) {
    if (i <= this.prodkpis.length - 1) {
      let id = this.prodkpis[i].id;
      this.projservice.deletekpi(id).subscribe();
    }
    this.productionkpis.controls.splice(i, 1);
  }




async savefile() {
  let fv = this.myForm.value;
    let fv2 = this.myForm.value.productionkpis;
    let fc = this.myForm.get('productionkpis')['controls'];
    const { productionkpis, ...value } = fv;
    this.projservice.updateproj(value, this.projid).subscribe();
    let vl = [];
    for (let i = 0; i < fc.length; i++) {
      if (fc[i].dirty === true) {
        let val = {
          type: 'Content Creation',
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
    await this.router.navigateByUrl('/pf3contentdelivery/' + this.projid);
  }

  async onDraft() {
    await this.savefile();
    await this.router.navigateByUrl('/projects');
  }
}
