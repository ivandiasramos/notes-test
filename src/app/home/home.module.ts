import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { FilterNoteModule } from '../shared/filters/filter-note/filter-note.module';

@NgModule({
  declarations: [
    AsideComponent,
    HomeComponent,
    MainComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HomeRoutingModule,
    FilterNoteModule,
    CommonModule,
    FormsModule,
    CoreModule,
  ]
})
export class HomeModule { }
