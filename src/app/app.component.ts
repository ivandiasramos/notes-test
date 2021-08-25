import { Component } from '@angular/core';
import { StoreService } from './core/services/store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storeService: StoreService) {
    const notes = [
      {
        title: 'Title',
        description: 'Description'
      }
    ];

    this.storeService.setNotes(notes);

    this.storeService.getNotes();
  }
}
