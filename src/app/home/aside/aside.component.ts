import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExportImportService, HTMLInputEvent } from './../../shared/services/export-import/export-import/export-import.service';
import { INote, StoreService } from './../../core/services/store/store.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnDestroy, OnInit {
  @Output()
  createdNote = new EventEmitter();

  @Output()
  openedNote = new EventEmitter<INote>();

  @Output()
  removedNote = new EventEmitter<INote>();

  @ViewChild('importInput')
  importInput: ElementRef;

  searchControl = new FormControl();
  isSorted: boolean;

  private destroy = new Subject();

  constructor(
    public store: StoreService,
    public exportImportService: ExportImportService
  ) {}

  ngOnInit() {
    this.updateNotes();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private updateNotes(): void {
    interval(60000)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.store.notes.forEach(note => {
          const newNote = { ...note, lastUpdate: this.getLastUpdate(note) };
          this.store.updateNote(newNote);
        });
      });
  }

  sortByUpdate(): void {
    this.store.notes = this.store.notes.sort((a, b) => {
      if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
        return this.isSorted ? 1 : -1;
      }
      if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
        return this.isSorted ? -1 : 1 ;
      }
      return 0;
    });

    this.isSorted = !this.isSorted;
  }

  createNote(): void {
    this.createdNote.emit();
  }

  openNote(note: INote): void {
    this.openedNote.emit(note);
  }

  removeNote(note: INote): void {
    this.removedNote.emit(note);
  }

  activeImportInput(): void {
    this.importInput.nativeElement.click();
  }

  importNotes($event: any): void {
    this.exportImportService.importNotes($event);
    this.importInput.nativeElement.value = '';
  }

  exportNotes(): void {
    this.exportImportService.exportNotes();
  }

  getLastUpdate(note: INote): string {
    const currentDate = new Date();
    const diffInSeconds = Math.floor(Math.abs((currentDate.getTime() - new Date(note.date).getTime()) / 1000));

    if (diffInSeconds < 60) {
      return 'few seconds ago';
    }

    if (diffInSeconds < 3600) {
      return 'few minutes ago';
    }

    const diffInHours = Math.floor(diffInSeconds / 3600);

    if (diffInHours < 24) {
      return `${diffInHours} hour(s) ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    return `${diffInDays} day(s) ago`;
  }
}
