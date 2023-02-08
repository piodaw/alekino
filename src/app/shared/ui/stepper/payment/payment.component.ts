import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { map } from 'rxjs';

import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store';

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
  ],
  template: `
    <div>
      <form [formGroup]="paymentForm" (ngSubmit)="submitPaymentForm()">
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Kod blik</mat-label>
          <input matInput placeholder="Kod blik" formControlName="blikCode" (keypress)="preventMoreNumbers($event)" />
        </mat-form-field>
        <div class="button-wrapper">
          <button mat-stroked-button color="warn" type="button" matStepperPrevious>Wróć</button>
          <button mat-raised-button type="submit" color="primary">Zapłać</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .button-wrapper {
        display: flex;
        justify-content: center;
        gap: 12px;
      }

      .button-wrapper button {
        width: 100px;
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
      blikCode: this.formBuilder.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }
}
