import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterNotePipe } from './filter-note.pipe';

@NgModule({
  declarations: [
    FilterNotePipe
  ],
  exports: [
    FilterNotePipe
  ],
  imports: [
    CommonModule
  ]
})
export class FilterNoteModule { }
