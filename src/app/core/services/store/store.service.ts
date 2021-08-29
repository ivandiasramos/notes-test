import { Injectable } from '@angular/core';

export interface INote {
  title: string,
  description: string,
  date: Date,
  id?: number,
  lastUpdate: string
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public notes: INote[] = [];

  constructor() {
    this.getSessionNotes().forEach(note => this.notes.push(note))
  }

  private get sessionNotes() {
    return sessionStorage.getItem('notes');
  }

  getSessionNotes(): INote[] {
    if (this.sessionNotes) {
      return JSON.parse(this.sessionNotes) as INote[];
    }

    return [];
  }

  getLastNote(): INote {
    return this.getSessionNotes()[this.getSessionNotes().length - 1];
  }

  getNote(id: number | undefined): INote | undefined {
    return this.getSessionNotes().find(note => note.id === id);
  }

  clearNotes(): void {
    this.notes = [];
    sessionStorage.clear();
  }

  setNote(note: INote): void {
    this.notes.push(this.createNewNote(note));

    sessionStorage.setItem(
      'notes',
      JSON.stringify(this.notes)
    );
  }

  removeNote(noteParam: INote): void {
    this.notes = this.notes.filter(note => note.id !== noteParam.id)

    sessionStorage.setItem(
      'notes',
      JSON.stringify(this.notes)
    );
  }

  updateNote(noteParam: INote): void {
    this.notes = this.notes.map(note => 
      note.id === noteParam.id
        ? this.createNote(noteParam)
        : note
    );

    sessionStorage.setItem(
      'notes',
      JSON.stringify(this.notes)
    );
  }

  private createNote(noteParam: INote): INote {
    return { title: noteParam.title, description: noteParam.description, id: noteParam.id, date: noteParam.date, lastUpdate: noteParam.lastUpdate || 'few seconds ago' };
  }

  private createNewNote(note: INote): INote {
    return { ...note, id: Date.now() };
  }
}
