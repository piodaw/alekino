import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

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
    MatStepperModule
  ],
  template: `
    <div>
      <form>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Kod blik</mat-label>
          <input matInput placeholder="Kod blik" required />
        </mat-form-field>
      </form>
      <div class="button-wrapper">
        <button mat-stroked-button color="warn" matStepperPrevious>Wróć</button>
        <button mat-raised-button color="primary" matStepperNext>Zapłać</button>
      </div>
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
  toggleValue = false;
}
