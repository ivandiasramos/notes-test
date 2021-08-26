import { Component, EventEmitter, Output } from '@angular/core';
import { INote, StoreService } from './../../core/services/store/store.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Output()
  createdNote = new EventEmitter();

  @Output()
  openedNote = new EventEmitter<INote>();

  @Output()
  removedNote = new EventEmitter<INote>();

  constructor(public store: StoreService) {}

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
