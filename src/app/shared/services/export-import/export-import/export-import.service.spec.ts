import { StoreService } from './../../../../core/services/store/store.service';
import { TestBed } from '@angular/core/testing';

import { ExportImportService } from './export-import.service';

describe('ExportImportService', () => {
  let service: ExportImportService;
  let storeService = {};

  beforeEach(() => {
    storeService = {
      notes: [
        { title: 'title1', description: 'description1', id: 1, date: new Date(), lastUpdate: '' },
        { title: 'title2', description: 'description2', id: 2, date: new Date(), lastUpdate: '' },
      ],
    };

    TestBed.configureTestingModule({
      providers: [
        ExportImportService,
        { provide: StoreService, useValue: storeService }
      ]
    });
    service = TestBed.inject(ExportImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportNotes', () => {
    it('should execute exportNotes without error', () => {
      service.exportNotes();
    });
  });
});
