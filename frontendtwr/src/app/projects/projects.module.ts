import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Pf1introComponent } from './pf1intro/pf1intro.component';
import { Pf2objectivesComponent } from './pf2objectives/pf2objectives.component';
import { Pf6tasksComponent } from './pf6tasks/pf6tasks.component';
import { PGComponent } from './pg/pg.component';
import { PGsComponent } from './pgs/pgs.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { Approval0Pipe } from '../pipes/approval0.pipe';
import { Approval1Pipe } from '../pipes/approval1.pipe';
import { Approval2Pipe } from '../pipes/approval2.pipe';
import { Dateadd } from '../pipes/dateadd.pipe';
import { Dateadd2 } from '../pipes/dateadd2.pipe';
import { FirstLetter } from '../pipes/firstletter.pipe';
import { sortPipe } from '../pipes/sort.pipe';
import { inYears } from '../pipes/inyears.pipe';
import { ViewprojComponent } from './viewproj/viewproj.component';
import { ActiveprojComponent } from './activeproj/activeproj.component';
import { Pf3contentdeliveryComponent } from './pf3contentdelivery/pf3contentdelivery.component';
import { Pf4marketingComponent } from './pf4marketing/pf4marketing.component';
import { Pf5audiencerelationsComponent } from './pf5audiencerelations/pf5audiencerelations.component';
import { Pf7reportingComponent } from './pf7reporting/pf7reporting.component';
import { Pf8budgetComponent } from './pf8budget/pf8budget.component';
import { Pf6fundraisingComponent } from './pf6fundraising/pf6fundraising.component';
import { LanguageComponent } from './language/language.component';
import { ProposalnavComponent } from '../shared/proposalnav/proposalnav.component';
import { GanttComponent } from '../shared/gantt/gantt.component';

@NgModule({
  declarations: [
    PGComponent,
    PGsComponent,
    Pf1introComponent,
    Pf2objectivesComponent,
    Pf6tasksComponent,
    ProjectsComponent,
    TasksComponent,
    Approval0Pipe,
    Approval1Pipe,
    Approval2Pipe,
    Dateadd,
    Dateadd2,
    FirstLetter,
    inYears,
    sortPipe,
    ViewprojComponent,
    ActiveprojComponent,
    Pf3contentdeliveryComponent,
    Pf4marketingComponent,
    Pf5audiencerelationsComponent,
    Pf7reportingComponent,
    Pf8budgetComponent,
    Pf6fundraisingComponent,
    LanguageComponent,
    ProposalnavComponent,
    GanttComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProjectsModule { }
