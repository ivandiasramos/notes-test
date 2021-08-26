import { Component, OnInit } from '@angular/core';
import { INote, StoreService } from '../core/services/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public currentNote: INote | null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
  }

  createNote() {
    this.currentNote = null;
    const note =
      {
        title: 'Untitled',
        description: ''
      };

    this.storeService.setNote(note);
    setTimeout(() => this.currentNote = this.storeService.getLastNote());
  }

}
