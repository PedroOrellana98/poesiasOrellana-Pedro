import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoesiasPageRoutingModule } from './poesias-routing.module';

import { PoesiasPage } from './poesias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoesiasPageRoutingModule
  ],
  declarations: [PoesiasPage]
})
export class PoesiasPageModule {}
