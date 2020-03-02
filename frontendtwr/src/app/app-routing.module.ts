import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { LoggedinGuard } from './guards/loggedin.guard';
import { PGsComponent } from './projects/pgs/pgs.component';
import { PGComponent } from './projects/pg/pg.component';
import { Pf1introComponent } from './projects/pf1intro/pf1intro.component';
import { Pf2objectivesComponent } from './projects/pf2objectives/pf2objectives.component';
import { Pf3contentdeliveryComponent } from './projects/pf3contentdelivery/pf3contentdelivery.component';
import { Pf4marketingComponent } from './projects/pf4marketing/pf4marketing.component';
import { Pf5audiencerelationsComponent } from './projects/pf5audiencerelations/pf5audiencerelations.component';
import { Pf6tasksComponent } from './projects/pf6tasks/pf6tasks.component';
import { Pf6fundraisingComponent } from './projects/pf6fundraising/pf6fundraising.component';
import { Pf7reportingComponent } from './projects/pf7reporting/pf7reporting.component';
import { Pf8budgetComponent } from './projects/pf8budget/pf8budget.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ViewprojComponent } from './projects/viewproj/viewproj.component';
import { AdminGuard } from './guards/admin.guard';
import { LanguageComponent } from './projects/language/language.component';
import { ActiveprojComponent } from './projects/activeproj/activeproj.component';
import { TasksComponent } from './projects/tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
  { path: '', component: ProjectsComponent, canActivate: [LoggedinGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserComponent, /*canActivate: [LoggedinGuard, AdminGuard]*/},
  { path: 'pgroup', component: PGsComponent, canActivate: [LoggedinGuard] },
  { path: 'langlist', component: LanguageComponent, canActivate: [LoggedinGuard] },
  { path: 'addpg', component: PGComponent, canActivate: [LoggedinGuard] },
  { path: 'addpg/:id', component: PGComponent, canActivate: [LoggedinGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [LoggedinGuard] },
  { path: 'project/:id', component: ProjectsComponent, canActivate: [LoggedinGuard] },
  { path: 'pf1intro', component: Pf1introComponent, canActivate: [LoggedinGuard] },
  { path: 'pf1intro/:id', component: Pf1introComponent, canActivate: [LoggedinGuard] },
  { path: 'pf2objectives/:id', component: Pf2objectivesComponent, canActivate: [LoggedinGuard] },
  { path: 'pf3contentdelivery/:id', component: Pf3contentdeliveryComponent, canActivate: [LoggedinGuard] },
  { path: 'pf4marketing/:id', component: Pf4marketingComponent, canActivate: [LoggedinGuard] },
  { path: 'pf5audiencerelations/:id', component: Pf5audiencerelationsComponent, canActivate: [LoggedinGuard] },
  { path: 'pf6tasks/:id', component: Pf6tasksComponent, canActivate: [LoggedinGuard] },
  { path: 'pf6fundraising/:id', component: Pf6fundraisingComponent, canActivate: [LoggedinGuard] },
  { path: 'pf7reporting/:id', component: Pf7reportingComponent, canActivate: [LoggedinGuard] },
  { path: 'pf8budget/:id', component: Pf8budgetComponent, canActivate: [LoggedinGuard] },
  { path: 'viewproj/:id', component: ViewprojComponent, canActivate: [LoggedinGuard] },
  { path: 'activeproj/:id', component: ActiveprojComponent, canActivate: [LoggedinGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [LoggedinGuard] },
  { path: 'dashboard/:id', component: DashboardComponent, canActivate: [LoggedinGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedinGuard] },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],

})
export class AppRoutingModule {

}
