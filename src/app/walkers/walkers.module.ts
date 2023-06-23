import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalkersRoutingModule } from './walkers-routing.module';
import { WalkersComponent } from './walkers.component';


@NgModule({
  declarations: [
    WalkersComponent
  ],
  imports: [
    CommonModule,
    WalkersRoutingModule
  ]
})
export class WalkersModule { }
