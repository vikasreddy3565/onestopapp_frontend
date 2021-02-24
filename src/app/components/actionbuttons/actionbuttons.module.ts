import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialPrimengModule } from 'src/app/material.primeng.module';
import { ActionbuttonsComponent } from './actionbuttons.component';

@NgModule({
  declarations: [
    ActionbuttonsComponent
  ],
  imports: [
    CommonModule,
    MaterialPrimengModule,
  ],
  exports: [
    ActionbuttonsComponent
  ]
})
export class ActionButtonModule { }
