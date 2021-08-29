import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  searchControl = new FormControl();

  private destroy = new Subject();

  constructor(public store: StoreService) {}

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

  createNote(): void {
    this.createdNote.emit();
  }

  openNote(note: INote): void {
    this.openedNote.emit(note);
  }

  removeNote(note: INote): void {
    this.removedNote.emit(note);
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
