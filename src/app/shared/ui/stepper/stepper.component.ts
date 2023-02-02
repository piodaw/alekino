import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HallComponent } from './hall/hall.component';
import { Observable } from 'rxjs';
import { ShowingById, Ticket } from 'src/app/features/home/shared/home.interfaces';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HallComponent,
    ContactFormComponent,
    PaymentComponent
  ],
  template: `
    <mat-stepper #stepper>
      <mat-step>
        <ng-template matStepLabel>Wybierz miejsca</ng-template>
        <app-hall
          [showing$]="showing$"
          [tickets$]="tickets$"
          (selectedSeat)="seatHandler($event)"
          (removedSeat)="removeSeatHandler($event)"></app-hall>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Wprowadź dane</ng-template>
        <app-contact-form></app-contact-form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Płatność</ng-template>
        <app-payment></app-payment>
      </mat-step>
    </mat-stepper>
  `,
  styles: [
    `
      .mat-mdc-form-field {
        margin-top: 16px;
      }

      mat-stepper {
        min-height: calc(100vh - var(--header-height));
      }
    `,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  @Input() showing$!: Observable<ShowingById>;
  @Input() tickets$!: Observable<Ticket[]>;
  @Output() selectedSeat = new EventEmitter<{ seat: string; showingId: number }>();
  @Output() removeSeat = new EventEmitter<{ seat: string; showingId: number }>();

  seatHandler({ seat, showingId }: { seat: string; showingId: number }) {
    this.selectedSeat.emit({ seat, showingId });
  }

  removeSeatHandler({ seat, showingId }: { seat: string; showingId: number }) {
    this.removeSeat.emit({ seat, showingId });
  }
}
