import { Component, EventEmitter, Output } from '@angular/core';
import { StoreService } from './../../core/services/store/store.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Output()
  createdNote = new EventEmitter();

  constructor(public store: StoreService) {}

  createNote(): void {
    this.createdNote.emit();
  }
}
