import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KPI, Project } from '../project.model';

@Component({
  selector: 'app-pf8budget',
  templateUrl: './pf8budget.component.html',
  styleUrls: ['./pf8budget.component.css']
})
export class Pf8budgetComponent implements OnInit {

  constructor(private projservice: ProjectsService, private route: ActivatedRoute, private router: Router) { }
  
  kpi: KPI[];
  project: Project;
  projid: string;

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.kpi = await this.projservice.getkpibyprojwithtasks(this.projid).toPromise() as KPI[];
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
  }

  async uploadbud(e) {if (e.key === 'Tab') { 
    const val = {budget: e.target.value}
    await this.projservice.updatekpi(e.target.name, val).toPromise();
  }}
  async uploadblbud(e) { 
    const val = {budget: e.target.value}
    await this.projservice.updatekpi(e.target.name, val).toPromise();
  }

  async submit() {
    const value = { approvallevel: 1 }
    this.projservice.updateproj(value, this.projid).subscribe();
    this.router.navigate(['/projects']);
  }
  
  async save() {
    this.router.navigate(['/projects']);
  }

  async reviewproject() {
    this.router.navigateByUrl('/viewproj/' + this.projid);
  }
}
