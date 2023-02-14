import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { map } from 'rxjs';

import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store';
import { NgIf, UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { getErrorMessage } from '@shared/form-errors/form.errors'
import { allowOnlyNumbersValidator, whitespaceValidator } from '@shared/validators/form.validators'

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    MatStepperModule,
    UpperCasePipe,
    TranslateModule,
    NgIf
  ],
  template: `
    <div class="payment-wrapper">
      <form [formGroup]="paymentForm" (ngSubmit)="submitPaymentForm()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>{{ 'Kod blik' | uppercase | translate }}</mat-label>
          <input matInput [placeholder]="'Kod blik' | uppercase | translate" formControlName="blikCode" (keypress)="preventMoreNumbers($event)" />
          <mat-error *ngIf="errorMessage('blikCode') as message">{{ message | uppercase | translate }}</mat-error>
        </mat-form-field>
        <div class="button-wrapper">
          <button mat-stroked-button color="warn" type="button" matStepperPrevious>{{ 'Wróć' | uppercase | translate }}</button>
          <button mat-raised-button type="submit" color="primary">{{ 'Zapłać' | uppercase | translate }}</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .payment-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      form {
        display: flex;
        flex-direction: column;
        padding: 48px;
        gap: 10px;
        width: 300px;
      }
      
      mat-form-field {
        width: 100%;
      }
      
      .button-wrapper {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .button-wrapper button {
        width: 100px;
      }
      
      mat-error {
        font-size: 14px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  private reservationStore = inject(ReservationsStore);
  private formBuilder = inject(NonNullableFormBuilder);

  paymentForm = this.createPaymentForm();

  preventMoreNumbers(event: KeyboardEvent) {
    if (this.paymentForm.getRawValue().blikCode.length >= 6) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.reservationStore.state$.subscribe(state => console.log(state))
  }

  errorMessage(formControlName: 'blikCode') {
    return getErrorMessage(formControlName, this.paymentForm)
  }

  submitPaymentForm() {
    this.paymentForm.markAllAsTouched();

    if (this.paymentForm.invalid) {
      return;
    }

    this.reservationStore.setState(state => ({
      ...state,
      blikCode: this.paymentForm.getRawValue().blikCode,
    }));

    this.reservationStore.completeReservation(this.reservationData$);
  }

  readonly reservationData$ = this.reservationStore.state$.pipe(map(state => state));

  private createPaymentForm() {
    return this.formBuilder.group({
      blikCode: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        whitespaceValidator,
        allowOnlyNumbersValidator
      ]),
    });
  }
}
