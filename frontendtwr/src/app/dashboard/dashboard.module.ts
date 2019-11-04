import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
