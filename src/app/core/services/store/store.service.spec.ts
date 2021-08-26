import { TestBed } from '@angular/core/testing';

import { INote, StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSessionNotes', () => {
    it('should return empty array', () => {
      expect(service.getSessionNotes()).toHaveLength(0);
    });

    it('should return array with 1 item', () => {
      const note: INote = { title: 'Title', description: 'Description' };
      service.setNote(note);

      expect(service.getSessionNotes()).toHaveLength(1);
    });
  })
});
