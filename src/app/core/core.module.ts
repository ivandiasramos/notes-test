import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    ServicesModule,
    CommonModule,
  ]
})
export class CoreModule { }
