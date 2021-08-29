import { CoreModule } from './../../../../core/core.module';
import { TestBed } from '@angular/core/testing';

import { ExportImportService } from './export-import.service';

describe('ExportImportService', () => {
  let service: ExportImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [ExportImportService]
    });
    service = TestBed.inject(ExportImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
