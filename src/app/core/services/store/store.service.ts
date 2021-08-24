import { Injectable } from '@angular/core';

export interface INotes {
  title: string,
  description: string,
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  getNotes(): INotes[] {
    const sessionNotes = sessionStorage.getItem('notes');

    if (sessionNotes) {
      return JSON.parse(sessionNotes) as INotes[];
    }

    return [];
  }

  setNotes(notes: INotes[]): void {
    sessionStorage.setItem('notes', JSON.stringify(notes));
  }
}
