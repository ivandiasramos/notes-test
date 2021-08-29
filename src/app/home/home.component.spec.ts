import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockProvider, MockService } from 'ng-mocks';
import { INote, StoreService } from '../core/services/store/store.service';
import { FilterNoteModule } from '../shared/filters/filter-note/filter-note.module';
import { AsideComponent } from './aside/aside.component';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MainComponent,
        AsideComponent
      ],
      imports: [
        ReactiveFormsModule,
        FilterNoteModule,
        CommonModule,
        FormsModule,
      ],
      providers: [MockProvider(StoreService)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createNote', () => {
    it('should call openNote', () => {
      const spy = jest.spyOn(component, 'openNote');
      component.createNote();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('removeNote', () => {
    it('should reset currentNote', () => {
      const defaultNote = {
        title: 'Untitled',
        description: '',
        date: new Date(),
        lastUpdate: 'few seconds ago'
      };

      component.createNote();
      component.removeNote(defaultNote);

      expect(component.currentNote).toBe(null);
    });
  });
});
