import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoesiasPage } from './poesias.page';

const routes: Routes = [
  {
    path: '',
    component: PoesiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoesiasPageRoutingModule {}
