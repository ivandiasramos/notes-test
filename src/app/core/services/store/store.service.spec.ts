import { TestBed } from '@angular/core/testing';

import { INotes, StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getNotes', () => {
    it('should return empty array', () => {
      expect(service.getNotes()).toHaveLength(0);
    });

    it('should return array with 1 item', () => {
      const notes: INotes[] = [
        { title: 'Title', description: 'Description' }
      ]
      service.setNotes(notes);

      expect(service.getNotes()).toHaveLength(1);
    });
  })
});
