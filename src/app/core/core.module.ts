import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './components/aside/aside.component';
import { MainComponent } from './components/main/main.component';
import { ServicesModule } from './services/services.module';

const COMPONENTS = [
  AsideComponent,
  MainComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    ServicesModule,
    CommonModule,
  ]
})
export class CoreModule { }
