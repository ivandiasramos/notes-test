import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsideComponent } from './aside/aside.component';
import { MainComponent } from './main/main.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { FilterNoteModule } from './../shared/filters/filter-note/filter-note.module';
import { ExportImportModule } from '../shared/services/export-import/export-import/export-import.module';

@NgModule({
  declarations: [
    AsideComponent,
    HomeComponent,
    MainComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ExportImportModule,
    HomeRoutingModule,
    FilterNoteModule,
    CommonModule,
    FormsModule,
    CoreModule,
  ]
})
export class HomeModule { }
