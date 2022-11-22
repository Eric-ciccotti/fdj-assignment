import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Teams } from './teams.page';

const routes: Routes = [
  {
    path: '',
    component: Teams
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsPageRoutingModule { }
