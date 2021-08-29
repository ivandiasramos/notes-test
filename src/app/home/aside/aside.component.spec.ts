import { ExportImportService } from './../../shared/services/export-import/export-import/export-import.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { FilterNoteModule } from './../../shared/filters/filter-note/filter-note.module';
import { INote, StoreService } from './../../core/services/store/store.service';
import { AsideComponent } from './aside.component';

function createNote(nowDate?: Date, milliseconds?: number): INote {
  return {
    title: 'Title',
    description: 'description',
    date: nowDate && milliseconds ? new Date(nowDate.getTime() - milliseconds) : new Date(),
    lastUpdate: 'few seconds ago'
  };
}

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, FilterNoteModule],
      declarations: [ AsideComponent ],
      providers: [MockProvider(StoreService), MockProvider(ExportImportService)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getLastUpdate', () => {
    it('should return "few seconds ago"', () => {
      const nowDate = new Date();
      const note = createNote(nowDate, 54000);

      expect(component.getLastUpdate(note)).toBe('few seconds ago')
    });

    it('should return "few minutes ago"', () => {
      const nowDate = new Date();
      const note = createNote(nowDate, 66000);

      expect(component.getLastUpdate(note)).toBe('few minutes ago')
    });

    it('should return "1 hour(s) ago"', () => {
      const nowDate = new Date();
      const note = createNote(nowDate, 60000 * 60);

      expect(component.getLastUpdate(note)).toBe('1 hour(s) ago')
    });

    it('should return "1 day(s) ago"', () => {
      const nowDate = new Date();
      const note = createNote(nowDate, (60000 * 60) * 24);

      expect(component.getLastUpdate(note)).toBe('1 day(s) ago')
    });
  });

  describe('openNote', () => {
    it('should call openedNote EventEmitter', () => {
      const spy = jest.spyOn(component.openedNote, 'emit');

      component.openNote(createNote());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('createNote', () => {
    it('should call createdNote EventEmitter', () => {
      const spy = jest.spyOn(component.createdNote, 'emit');

      component.createNote();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removeNote', () => {
    it('should call removedNote EventEmitter', () => {
      const spy = jest.spyOn(component.removedNote, 'emit');

      component.removeNote(createNote());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sortByUpdate', () => {
    beforeEach(() => {
      const note1: INote = { title: 'title1', description: 'description1', id: 1, date: new Date('2021-08-29T18:47:57.883Z'), lastUpdate: '' };
      const note2: INote = { title: 'title2', description: 'description2', id: 2, date: new Date('2021-08-28T18:47:57.883Z'), lastUpdate: '' };
      const note3: INote = { title: 'title3', description: 'description3', id: 3, date: new Date('2021-08-28T18:47:57.883Z'), lastUpdate: '' };

      component.store.notes = [note1, note2, note3];
      component.store.setNote(note2);
    });

    it('should set isSorted as true', () => {
      component.sortByUpdate();

      expect(component.isSorted).toBeTruthy();
    });

    it('should set isSorted as false', () => {
      component.sortByUpdate();
      component.sortByUpdate();

      expect(component.isSorted).toBeFalsy();
    });
  });

  describe('activeImportInput', () => {
    it('should click on input file', () => {
      const spy = jest.spyOn(component.importInput.nativeElement, 'click');
      
      component.activeImportInput();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('exportNotes', () => {
    it('should call exportNotes', () => {
      const note: INote = { title: 'title1', description: 'description1', id: 1, date: new Date('2021-08-29T18:47:57.883Z'), lastUpdate: '' };
      const spy = jest.spyOn(component.exportImportService, 'exportNotes');
      component.store.notes = [note];

      component.exportNotes();

      expect(spy).toHaveBeenCalled();
    });
  });
});

