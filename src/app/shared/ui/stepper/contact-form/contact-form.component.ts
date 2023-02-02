import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-contact-form',
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
          <mat-label>Imię</mat-label>
          <input matInput placeholder="Imię" required />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Nazwisko</mat-label>
          <input matInput placeholder="Nazwisko" required />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Telefon</mat-label>
          <input matInput placeholder="Telefon" required />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Adres e-mail</mat-label>
          <input matInput type="email" placeholder="Adres e-mail" required />
        </mat-form-field>
        <mat-form-field appearance="outline" color="accent">
          <mat-label>Powtórz adres e-mail</mat-label>
          <input matInput type="email" placeholder="Powtórz adres e-mail" required />
        </mat-form-field>
        <mat-slide-toggle [checked]="toggleValue" (change)="toggleValue = !toggleValue" color="accent">
          Zgoda na otrzymywanie newslettera
        </mat-slide-toggle>
        <form>
          <mat-form-field appearance="outline" color="accent">
            <mat-label>Kod rabatowy</mat-label>
            <input matInput placeholder="Kod rabatowy" />
          </mat-form-field>
        </form>
      </form>
      <div class="button-wrapper">
        <button mat-stroked-button color="warn" matStepperPrevious>Wróć</button>
        <button mat-raised-button color="primary" matStepperNext>Dalej</button>
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
export class ContactFormComponent {
  toggleValue = false;
}
