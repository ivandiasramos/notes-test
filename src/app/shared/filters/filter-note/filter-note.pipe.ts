import { Pipe, PipeTransform } from '@angular/core';
import { INote } from 'src/app/core/services/store/store.service';

@Pipe({
  name: 'filterNote',
  pure: true,
})
export class FilterNotePipe implements PipeTransform {
  transform(notes: INote[], title: string): INote[] {
    if (!notes || !title) {
      return notes;
    }
    return this.filterNotes(notes, title);
  }

  private filterNotes(notes: INote[], title: string): INote[] {
    return notes.filter(note =>
      note.title.toLowerCase()
        .includes(
          title.toLowerCase()
        )
    );
  }
}

