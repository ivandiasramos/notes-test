import { TestBed } from '@angular/core/testing';

import { INote, StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
    service.clearNotes();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSessionNotes', () => {
    it('should return empty array', () => {
      expect(service.getSessionNotes()).toHaveLength(0);
    });

    it('should return array with 1 item', () => {
      const note: INote = { title: 'Title', description: 'Description', date: new Date(), lastUpdate: '' };
      service.setNote(note);

      expect(service.getSessionNotes()).toHaveLength(1);
    });
  })

  describe('getLastNote', () => {
    it('should return last note', () => {
      service.setNote({ title: 'title1', description: 'description1', date: new Date(), lastUpdate: '' });
      service.setNote({ title: 'title2', description: 'description2', date: new Date(), lastUpdate: '' });

      expect(service.getLastNote().id).toBe(2);
    });
  })

  describe('removeNote', () => {
    it('should remove a note', () => {
      const note: INote = { title: 'title1', description: 'description1', id: 1, date: new Date(), lastUpdate: '' };

      service.setNote(note);
      service.removeNote(note);

      expect(service.getNote(note.id)).toBeUndefined();
    });
  })

  describe('updateNote', () => {
    it('should update a note', () => {
      const note: INote = { title: 'title1', description: 'description1', date: new Date(), lastUpdate: '' };
      const newNote: INote = { title: 'title2', description: 'description2', id: 1, date: new Date(), lastUpdate: '' };

      service.setNote(note);
      service.updateNote(newNote);

      expect(service.getNote(1)?.title).toBe('title2');
    });

    it('should not update a note', () => {
      const note: INote = { title: 'title1', description: 'description1', date: new Date(), lastUpdate: '' };
      const newNote: INote = { title: 'title2', description: 'description2', id: 2, date: new Date(), lastUpdate: '' };

      service.setNote(note);
      service.updateNote(newNote);

      expect(service.getNote(1)?.title).toBe('title1');
    });
  })
});
