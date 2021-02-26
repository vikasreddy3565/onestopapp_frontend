import { NgModule } from '@angular/core';
import { MaterialPrimengModule } from 'src/app/material.primeng.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
@NgModule({
  imports: [
    HomeRoutingModule,
    MaterialPrimengModule
  ],
  exports: [
    HomeComponent

  ],
  declarations: [
    HomeComponent
  ],
  providers: [],
})
export class HomeModule { }
