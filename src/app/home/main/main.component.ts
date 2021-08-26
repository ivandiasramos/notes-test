import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { INote, StoreService } from '../../core/services/store/store.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  @Input()
  note: INote;

  form: FormGroup;

  private destroy = new Subject();

  constructor(
    private store: StoreService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: this.getTitle(),
      description: this.note?.description,
      id: this.note?.id,
    });

    this.form.valueChanges
      .pipe(
        debounceTime(50),
        takeUntil(this.destroy)
      )
      .subscribe((form: INote) => this.store.updateNote(form))
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private getTitle(): null | string {
    return this.note?.title === 'Untitled' ? null : this.note?.title;
  }
}
