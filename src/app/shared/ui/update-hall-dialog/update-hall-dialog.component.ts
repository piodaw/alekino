import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { Observable, of } from 'rxjs'

import { Hall } from 'src/app/features/admin/shared/admin.interceptors'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { allowOnlyNumbersValidator } from '@shared/validators/form.validators'

export interface DialogData {
  hall$: Observable<Hall>
}

@Component({
  selector: 'app-repertoire-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Edytuj salę</h1>
    <div class="dialog-wrapper" *ngIf="data.hall$ | async as hall">
      <div>
        <p class="info">Podgląd sali</p>
        <div class="hall-container">
          <div class="hall">
            <div class="hall-wrapper" *ngFor="let row of rowsArray">
              <div class="rows">{{ row }}</div>
              <div class="columns" *ngFor="let column of columnsArray">
                {{ column }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div mat-dialog-content>
        <form [formGroup]="updateHall" (ngSubmit)="submit()">
          <div class="inputs-wrapper">
            <mat-form-field appearance="outline" color="accent">
              <mat-label>Liczba rzędów</mat-label>
              <input matInput type="number" placeholder="Liczba rzędów" (input)="rowMaxValue($event)" formControlName="rows">
            </mat-form-field>
            <mat-form-field appearance="outline" color="accent">
              <mat-label>Liczba kolumn</mat-label>
              <input matInput type="number" placeholder="Liczba kolumn" (input)="columnMaxValue($event)" formControlName="columns">
            </mat-form-field>
          </div>
          <div class="button-wrapper" mat-dialog-actions>
            <button mat-stroked-button color="warn" type="button" (click)="onNoClick()">Anuluj</button>
            <button mat-raised-button color="warn" type="button" (click)="removeHall(hall.id)">Usuń</button>
            <button mat-raised-button color="primary" type="submit">Potwierdź</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .dialog-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 12px;
    }
    
    .hall-container {
      max-height: 400px;
      max-width: 800px;
      overflow: auto;
    }
    
    .info {
      text-align: center;
      margin-bottom: 12px;
    }
    
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    mat-form-field {
      margin-bottom: 12px;
    }

    .hall {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .hall-wrapper {
      display: flex;
    }

    .rows {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      border: 1px solid var(--secondary);
      background-color: var(--secondaryDark);
    }

    .columns {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25px;
      height: 25px;
      border: 1px solid var(--secondary);
      background-color: var(--primaryLight);
    }
    
    .inputs-wrapper {
      display: flex;
      gap: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgIf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class UpdateHallDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef)
  private formBuilder = inject(NonNullableFormBuilder)
  updateHall = this.updateHallForm()
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  rowsArray: string[] = [];
  columnsArray: number[] = [];

  ngOnInit() {
    this.data.hall$.subscribe(hall => {
      this.updateHall.patchValue({
        hall_id: hall.id,
        rows: hall.rows.length,
        columns: hall.columns.length
      })
    })

    this.updateHall.valueChanges.subscribe((value: any) => {
      this.rowsArray = Array.from({length: value.rows}, (_, i) => this.alphabet[i]);
      this.columnsArray = Array.from({length: value.columns}, (_, i) => i + 1);
    })
  }

  rowMaxValue(event: Event) {
    const target = event.target as HTMLInputElement;
    if (+target.value >= 26) {
      target.value = '26';
      this.updateHall.get('rows')?.setValue(26);
    }
    if (+target.value <= 1) {
      target.value = '1';
      this.updateHall.get('rows')?.setValue(1);
    }
  }

  columnMaxValue(event: Event) {
    const target = event.target as HTMLInputElement;
    if (+target.value >= 28) {
      target.value = '28';
      this.updateHall.get('columns')?.setValue(28);
    }
    if (+target.value <= 1) {
      target.value = '1';
      this.updateHall.get('columns')?.setValue(1);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  removeHall(hall_id: number) {
    this.dialogRef.close({
      delete: hall_id
    });
  }

  submit() {
    this.dialogRef.close(of(this.updateHall.getRawValue()));
  }

  private updateHallForm() {
    return this.formBuilder.group({
      hall_id: this.formBuilder.control(0),
      rows: this.formBuilder.control(0, [Validators.required, Validators.max(26), Validators.min(1), allowOnlyNumbersValidator]),
      columns: this.formBuilder.control(0, [Validators.required, Validators.max(28), Validators.min(1), allowOnlyNumbersValidator])
    })
  }
}
