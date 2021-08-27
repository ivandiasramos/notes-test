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

  createNote(): void {
    this.storeService.setNote(this.defaultNote);

    this.openNote(this.storeService.getLastNote());
  }

  openNote(note: INote): void {
    this.currentNote = null;
    setTimeout(() => this.currentNote = note);
  }

  search(value: string | null): void {
    console.log(value)
  }

  removeNote(note: INote): void {
    this.storeService.removeNote(note);
    this.currentNote = null;
  }

  private get defaultNote(): INote {
    return {
      title: 'Untitled',
      description: ''
    };
  }

}
