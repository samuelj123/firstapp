import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Budget } from '../project.model';

@Component({
  selector: 'app-pf8budget',
  templateUrl: './pf8budget.component.html',
  styleUrls: ['./pf8budget.component.css']
})
export class Pf8budgetComponent implements OnInit {

  constructor(private projservice: ProjectsService, private route: ActivatedRoute, private router: Router) { }
  
	category= ['Content Creation', 'Content Delivery', 'Marketing', 'Audience Relations', 'Fundraising', 'Reporting']
  project: Project;
  projid: string;
	content_creation: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];
	content_delivery: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];
	marketing: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];
	audience_relations: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];
	fundraising: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];
	reporting: Budget[] = [{"amount": 0, "category":"Content Creation", "id": "null"}];

  async ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project;
		this.project.budget.forEach(x => {if (x.category==="Content Creation")this.content_creation[0]=x})
		this.project.budget.forEach(x => {if (x.category==="Content Delivery")this.content_delivery[0]=x})
		this.project.budget.forEach(x => {if (x.category==="Marketing")this.marketing[0]=x})
		this.project.budget.forEach(x => {if (x.category==="Audience Relations")this.audience_relations[0]=x})
		this.project.budget.forEach(x => {if (x.category==="Fundraising")this.fundraising[0]=x})
		this.project.budget.forEach(x => {if (x.category==="Reporting")this.reporting[0]=x})
		console.log(this.content_creation[0].category)
  }

	async uploadbud(e) {if (e.key === 'Tab') { 
    //const val = {amount: e.target.value, category: e.target.category, project: this.project.id}
		//console.log(val)
		//await this.projservice.postbudget(val).toPromise();
		 //{"amount": 350, "category": "Content Creation", "project:"...id"}
	}
	}
  async uploadblbud(e) { 
		const val = {amount: e.target.value, category: e.target.name, project: this.project.id}
		console.log(val)
		await this.projservice.postbudget(val).toPromise();
  }

  async submit() {
    const value = { approvallevel: 1 }
		const array=[]
		this.project.tasks.forEach(x => {array.push(x.enddate)});
		const maxnumber = Math.max(...array);
		const value2 = { projectduration: maxnumber }
    this.projservice.updateproj(value, this.projid).subscribe();
		this.projservice.updateproj(value2, this.projid).subscribe();
    this.router.navigate(['/projects']);
  }
  
  async save() {
    this.router.navigate(['/projects']);
  }

  async reviewproject() {
    this.router.navigateByUrl('/viewproj/' + this.projid);
  }
}
