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
      providers: [MockProvider(StoreService)]
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
});

