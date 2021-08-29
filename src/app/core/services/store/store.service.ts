import { Injectable } from '@angular/core';
import { EncryptionService } from '../encryption/encryption.service';

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
  private encryptString: string;

  constructor(
    private encryptionService: EncryptionService
  ) {
    this.getSessionNotes().forEach(note => this.notes.push(note))
  }

  private get sessionNotes() {
    return sessionStorage.getItem('notes');
  }

  getSessionNotes(): INote[] {
    if (this.sessionNotes) {
      return JSON.parse(this.encryptionService.decrypt(this.encryptString, 'notes')) as INote[];
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

    this.setNotesSession(this.notes);
  }

  removeNote(noteParam: INote): void {
    this.notes = this.notes.filter(note => note.id !== (noteParam && noteParam.id))

    this.setNotesSession(this.notes);
  }

  updateNote(noteParam: INote): void {
    this.notes = this.notes.map(note => 
      note.id === noteParam.id
        ? this.createNote(noteParam)
        : note
    );

    this.setNotesSession(this.notes);
  }

  private setNotesSession(notes: INote[]): void {
    const key = 'notes';
    this.encryptString = this.encryptionService.encrypt(JSON.stringify(notes), key);

    sessionStorage.setItem(
      key,
      this.encryptString
    );
  }

  private createNote(noteParam: INote): INote {
    return { title: noteParam.title, description: noteParam.description, id: noteParam.id, date: noteParam.date, lastUpdate: noteParam.lastUpdate || 'few seconds ago' };
  }

  private createNewNote(note: INote): INote {
    return { ...note, id: note.id ? note.id : Date.now() };
  }
}
