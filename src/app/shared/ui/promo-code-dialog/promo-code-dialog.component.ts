import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core'
import { AsyncPipe, NgForOf, NgIf, UpperCasePipe } from '@angular/common'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Observable } from 'rxjs'

import { PromoCode } from 'src/app/features/admin/shared/admin.interfaces'
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { getErrorMessage } from '@shared/form-errors/form.errors'
import { allowOnlyNumbersValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { TranslateModule } from '@ngx-translate/core'

export interface DialogData {
  code$: Observable<PromoCode>
}

@Component({
  selector: 'app-promo-code-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>{{ 'Edytuj kod rabatowy' | uppercase | translate }}</h1>
    <div class="dialog-wrapper">
      <div mat-dialog-content>
        <form [formGroup]="updatePromoForm" (ngSubmit)="submit()">
          <mat-form-field appearance="outline" color="accent">
            <mat-label>{{ 'Nazwa' | uppercase | translate }}</mat-label>
            <input matInput type="text" [placeholder]="'Wpisz nazwę kodu' | uppercase | translate" formControlName="code">
            <mat-error *ngIf="errorMessage('code') as message">{{ message | uppercase | translate }}</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" color="accent">
            <mat-label>{{ 'Wartość' | uppercase | translate }}</mat-label>
            <input matInput type="number" [placeholder]="'Procent obniżki' | uppercase | translate " formControlName="discount">
            <mat-error *ngIf="errorMessage('discount') as message">{{ message | uppercase | translate }}</mat-error>
          </mat-form-field>
          <div class="button-wrapper" mat-dialog-actions>
            <button mat-stroked-button color="warn" type="button" (click)="onNoClick()">{{ 'Anuluj' | uppercase | translate }}</button>
            <button mat-raised-button color="primary" type="submit">{{ 'Potwierdź' | uppercase | translate }}</button>
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
    }
    
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      width: 290px;
    }
    
    mat-form-field {
      width: 100%;
    }
    
    .button-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    mat-error {
      font-size: 14px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    NgIf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class PromoCodeDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  private dialogRef = inject(MatDialogRef)
  private formBuilder = inject(NonNullableFormBuilder)
  updatePromoForm = this.createUpdatePromoForm()

  ngOnInit() {
    this.data.code$.subscribe((code) => this.updatePromoForm.patchValue({
      code: code.promo_code,
      discount: code.value
    }))
  }

  errorMessage(formControlName: 'code' | 'discount') {
    return getErrorMessage(formControlName, this.updatePromoForm)
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.updatePromoForm.markAllAsTouched()

    if (this.updatePromoForm.invalid) {
      return;
    }

    this.dialogRef.close({
      updatedData: this.updatePromoForm.getRawValue()
    });
  }

  private createUpdatePromoForm() {
    return this.formBuilder.group({
      code: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        whitespaceValidator
      ]),
      discount: this.formBuilder.control(0, [
        Validators.required,
        Validators.min(5),
        Validators.max(80),
        allowOnlyNumbersValidator
      ])
    })
  }
}
