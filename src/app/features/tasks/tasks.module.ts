import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }