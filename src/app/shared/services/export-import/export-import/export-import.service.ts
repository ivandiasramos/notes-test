import { Injectable } from '@angular/core';
import { INote, StoreService } from './../../../../core/services/store/store.service';

@Injectable()
export class ExportImportService {

  constructor(private store: StoreService) {}

  importNotes($event: any): void {
    const reader = new FileReader();
    reader.readAsText($event.target.files[0], "UTF-8")
    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.actionsAfterImport(event);
    };
  }

  exportNotes(): void {
    const dataStr = JSON.stringify(this.store.notes);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'notes.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  private actionsAfterImport(event: ProgressEvent<FileReader>): void {
    if ((typeof event.target?.result === 'string') && Array.isArray(JSON.parse(event.target.result))) {
      const notes = JSON.parse(event.target.result) as INote[];
      const notesChecked = notes.filter(note => this.hasAllProperties(note));

      if (notesChecked.length === notes.length) {
        notes
          .filter(note => !this.store.notes.some(n => n.id === note.id))
          .forEach(note => this.store.setNote(note));
        return;
      }
    }
    
    window.alert('Please import a valid json');
  }

  private hasAllProperties(note: INote): unknown {
    return note.hasOwnProperty('title') && note.hasOwnProperty('description') && note.hasOwnProperty('date') && note.hasOwnProperty('id') && note.hasOwnProperty('lastUpdate');
  }
}
