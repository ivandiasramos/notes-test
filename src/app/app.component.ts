import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const notes = [
      {
        title: 'Title',
        description: 'Description'
      }
    ];

    sessionStorage.setItem('notes', JSON.stringify(notes))

    sessionStorage.getItem('notes')
  }
}
