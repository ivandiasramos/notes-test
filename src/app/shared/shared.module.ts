import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterNoteModule } from './filters/filter-note/filter-note.module';
import { ExportImportModule } from './services/export-import/export-import/export-import.module';

@NgModule({
  declarations: [],
  imports: [
    ExportImportModule,
    FilterNoteModule,
    CommonModule,
  ],
  exports: [
    ExportImportModule,
    FilterNoteModule
  ]
})
export class SharedModule { }
