import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Pf1introComponent } from 'src/app/projects/pf1intro/pf1intro.component';
import { Pf2objectivesComponent } from 'src/app/projects/pf2objectives/pf2objectives.component';
import { Pf3contentdeliveryComponent } from 'src/app/projects/pf3contentdelivery/pf3contentdelivery.component';
import { Pf4marketingComponent } from 'src/app/projects/pf4marketing/pf4marketing.component';
import { Pf5audiencerelationsComponent } from 'src/app/projects/pf5audiencerelations/pf5audiencerelations.component';
import { Pf6tasksComponent } from 'src/app/projects/pf6tasks/pf6tasks.component';
import { Pf6fundraisingComponent } from 'src/app/projects/pf6fundraising/pf6fundraising.component';
import { Pf7reportingComponent } from 'src/app/projects/pf7reporting/pf7reporting.component';
import { Pf8budgetComponent } from 'src/app/projects/pf8budget/pf8budget.component';

@Component({
  selector: 'app-proposalnav',
  templateUrl: './proposalnav.component.html',
  styleUrls: ['./proposalnav.component.css']
})
export class ProposalnavComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  projid: string;
  locus: string;
  pf: any;

  ngOnInit() {
    this.route.params.subscribe(params => this.projid = (params.id));
    this.locus = this.location.path();
    console.log(this.locus);
  }
  async apf1() {
    await this.router.navigateByUrl('/pf1intro/' + this.projid);
  }
  async apf2() {
    await this.router.navigateByUrl('/pf2objectives/' + this.projid);
  }
  async apf3() {
    await this.router.navigateByUrl('/pf3contentdelivery/' + this.projid);
  }
  async apf4() {
    await this.router.navigateByUrl('/pf4marketing/' + this.projid);
  }
  async apf5() {
    await this.router.navigateByUrl('/pf5audiencerelations/' + this.projid);
  }
  async apf6() {
    await this.router.navigateByUrl('/pf6tasks/' + this.projid);
  }
  async apf7() {
    await this.router.navigateByUrl('/pf6fundraising/' + this.projid);
  }
  async apf8() {
    await this.router.navigateByUrl('/pf7reporting/' + this.projid);
  }
  async apf9() {
    await this.router.navigateByUrl('/pf8budget/' + this.projid);
  }
}
