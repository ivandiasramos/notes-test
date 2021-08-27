import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { INote, StoreService } from './../../core/services/store/store.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnDestroy {
  @Output()
  createdNote = new EventEmitter();

  @Output()
  openedNote = new EventEmitter<INote>();

  @Output()
  removedNote = new EventEmitter<INote>();

  searchControl = new FormControl();

  private destroy = new Subject();

  constructor(public store: StoreService) {}

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
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
}
