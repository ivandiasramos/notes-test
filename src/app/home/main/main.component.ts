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
    this.form = this.getFormGroup();
    this.formChanges();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  private getFormGroup(): FormGroup {
    return this.fb.group({
      title: this.getTitle(),
      description: this.note?.description,
      id: this.note?.id,
      date: this.note?.date,
    });
  }

  private formChanges(): void {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy)
      )
      .subscribe((form: INote) => {
        this.updateDateField();
        this.store.updateNote(form);
      });
  }

  private updateDateField(): void {
    const currentDate = new Date();
    this.form.get('date')?.setValue(currentDate, { emitEvent: false });
  }

  private getTitle(): null | string {
    return this.note?.title === 'Untitled' ? null : this.note?.title;
  }
}
