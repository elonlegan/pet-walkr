import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkersComponent } from './walkers.component';

const routes: Routes = [{ path: '', component: WalkersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkersRoutingModule { }
