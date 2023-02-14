import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common'

import { Routing } from '@shared/routes/routing';
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { allowOnlyNumbersValidator, whitespaceValidator } from '@shared/validators/form.validators'
import { getErrorMessage } from '@shared/form-errors/form.errors'

@Component({
  selector: 'app-admin-promo-menu',
  standalone: true,
  template: `
    <div (click)="$event.stopPropagation()">
      <form [formGroup]="promocodeForm" (ngSubmit)="createPromocode()">
        <mat-form-field color="accent">
          <mat-label>{{ 'Nazwa' | uppercase | translate }}</mat-label>
          <input matInput type="text" [placeholder]="'Wpisz nazwę kodu' | uppercase | translate" formControlName="code" />
          <mat-error *ngIf="errorMessage('code') as message">{{ message | uppercase | translate }}</mat-error>
        </mat-form-field>
        <mat-form-field color="accent">
          <mat-label>{{ 'Wartość' | uppercase | translate }}</mat-label>
          <input matInput type="number" [placeholder]="'Procent obniżki' | uppercase | translate " formControlName="discount" />
          <mat-error *ngIf="errorMessage('discount') as message">{{ message | uppercase | translate }}</mat-error>
        </mat-form-field>
        <button mat-raised-button color="primary">{{ 'Dodaj' | uppercase | translate }}</button>
      </form>
    </div>
  `,
  styles: [
    `
      ::ng-deep.mat-mdc-menu-panel.mat-mdc-menu-panel {
        max-width: 350px;
      }
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        width: 250px;
      }
      
      mat-form-field {
        width: 100%;
      }
      
      button {
        width: 100px;
      }
      
      mat-error {
        font-size: 14px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    AsyncPipe,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule
  ]
})
export class AdminPromoCodeMenuComponent {
  @Output() promocodeData = new EventEmitter()
  private formBuilder = inject(NonNullableFormBuilder)

  routing = Routing;

  promocodeForm = this.createPromocodeForm();

  createPromocode() {
    this.promocodeForm.markAllAsTouched();

    if (this.promocodeForm.invalid) {
      return;
    }

    this.promocodeData.emit(this.promocodeForm.getRawValue());
  }

  errorMessage(formControlName: 'code' | 'discount') {
    return getErrorMessage(formControlName, this.promocodeForm)
  }

  private createPromocodeForm() {
    return this.formBuilder.group({
      code: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        whitespaceValidator
      ]),
      discount: this.formBuilder.control(5, [
        Validators.required,
        Validators.min(5),
        Validators.max(80),
        allowOnlyNumbersValidator
      ])
    })
  }
}
