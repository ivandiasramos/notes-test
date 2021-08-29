import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportImportService } from './export-import.service';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [ExportImportService]
})
export class ExportImportModule { }
