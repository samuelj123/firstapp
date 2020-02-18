import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project, PGroup } from '../project.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';

@Component({
	selector: 'app-pf1intro',
	templateUrl: './pf1intro.component.html',
	styleUrls: ['./pf1intro.component.css']
})
export class Pf1introComponent implements OnInit {

	pgroup: PGroup[];
	projid: string;
	myForm: FormGroup;
	project: Project;
	needs: any;
	constructor(
		private projservice: ProjectsService,
		private fb: FormBuilder,
		private router: Router,
		private uservice: UserService,
		private route: ActivatedRoute,
	) { }

	async ngOnInit() {
		this.pgroup = await this.projservice.getallpg().toPromise() as PGroup[];
		this.pgroup = this.pgroup.filter(x=>{return x.needs.length>0});
		await this.route.params.subscribe(params => this.projid = (params.id));

		// Build a Form here with the following -
		this.myForm = this.fb.group({
			pgroup: ['', Validators.required],
			name: ['', Validators.required],
			vision: ['', Validators.required],
			mission: ['', Validators.required],
			startdate:['', Validators.required]
		});

		if (this.projid !== undefined) { this.project = await this.projservice.getoneproj(this.projid).toPromise() as Project; }
		if (this.project !== undefined && this.pgroup !== undefined) {
			console.log(this.project.pgroup.pgroup);
			this.myForm.patchValue({
				pgroup: this.project.pgroup.pgroup,
				name: this.project.name,
				vision: this.project.vision,
				mission: this.project.mission,
				startdate: this.project.startdate,
			})
			this.myForm.get('pgroup').setValue(this.project.pgroup.id);
		}
	}

	async onSubmit() {
		const object = this.myForm.value;
		object.approvallevel = 0;
		const user: User = await this.uservice.currentuser().toPromise() as User;
		object.creator = user.id;
		const country: string = await this.uservice.currentusercountry() as string;
		object.country = country;
		const value: Project = await this.projservice.addproj(object).toPromise() as Project;
		await this.router.navigateByUrl('/pf2objectives/' + value.id);
	}
	fixneeds(e) {
		return this.needs = this.pgroup.find(x => x.id === e).needs;
	}
	goback() {
		this.router.navigateByUrl('/projects');
	}

	async savefile() {
		await this.projservice.updateproj(this.myForm.value, this.projid).subscribe();

	}
	async onSave() {
		await this.savefile();
		await this.router.navigateByUrl('/pf2objectives/' + this.projid);
	}
	async onDraft() {
		await this.savefile();
		// await this.router.navigateByUrl('/projects');
	}
}
