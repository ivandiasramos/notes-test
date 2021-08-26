import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    AsideComponent,
    HomeComponent,
    MainComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HomeRoutingModule,
    CommonModule,
    FormsModule,
  ]
})
export class HomeModule { }
