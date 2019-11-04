import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { TokenInterceptorService } from './user/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { DeldialogueComponent } from './shared/deldialogue/deldialogue.component';
import { SavedialogueComponent } from './shared/deldialogue/savedialogue.component';
import { DenydialogueComponent } from './shared/deldialogue/denydialogue.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DeldialogueComponent,
    SavedialogueComponent,
    DenydialogueComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserModule,
    ProjectsModule,
    DashboardModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  entryComponents: [
    DeldialogueComponent,
    SavedialogueComponent,
    DenydialogueComponent,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
