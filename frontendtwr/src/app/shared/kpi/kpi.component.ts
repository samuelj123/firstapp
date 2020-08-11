import { Component, OnInit, Input,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../../projects/projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project,KPI } from '../../projects/project.model';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})

export class KpiComponent implements OnInit {

	constructor(
		private projservice: ProjectsService, 
		private route: ActivatedRoute,
		private fb: FormBuilder,
	) { }

	@Input() projid: string;
	@Input() category: string;

	myForm: FormGroup;
	kpis: KPI[];

  async ngOnInit() {
		// this.kpis = await this.projservice.getkpibyproj(this.projid).toPromise() as KPI[];

		// // Setting up the Production Form
		// this.myForm = this.fb.group({
		// 	productionkpis: this.fb.array([this.fb.control('')]),
		// });

		// // Patching up KPIs into the form
		// this.prodkpis = this.prodkpis.filter(val => val.type === 'Content Creation');
		// this.prodkpis.sort((a,b)=>(a.updated>b.updated)?1:-1)
		// this.myForm.setControl('productionkpis', this.setkpis(this.prodkpis));
  }
}
