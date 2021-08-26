import { Injectable } from '@angular/core';

export interface INote {
  title: string,
  description: string,
  id?: number,
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public notes: INote[] = [];

  constructor() {
    this.getSessionNotes().forEach(note => this.notes.push(note))
  }

  get sessionNotes() {
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

  setNote(note: INote): void {
    this.notes.push(this.createNote(note));

    debugger;

    sessionStorage.setItem(
      'notes',
      JSON.stringify(this.notes)
    );
  }

  updateNote(noteParam: INote): void {
    this.notes = this.notes.map(note => 
      note.id === noteParam.id
        ? this.createNewNote(noteParam)
        : note
    );

    sessionStorage.setItem(
      'notes',
      JSON.stringify(this.notes)
    );
  }

  private createNewNote(noteParam: INote): INote {
    return { title: noteParam.title, description: noteParam.description, id: noteParam.id };
  }

  private createNote(note: INote): INote {
    return { ...note, id: this.getSessionNotes().length };
  }
}
