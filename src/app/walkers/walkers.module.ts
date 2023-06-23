import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalkersRoutingModule } from './walkers-routing.module';
import { WalkersComponent } from './walkers.component';
import { MaterialModule } from '@app/material/material.module';

@NgModule({
  declarations: [WalkersComponent],
  imports: [CommonModule, WalkersRoutingModule, MaterialModule],
})
export class WalkersModule {}
