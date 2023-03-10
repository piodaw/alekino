import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { HallComponent } from './hall/hall.component';
import { PromoCode, ShowingById, Ticket } from 'src/app/features/home/shared/home.interfaces'
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PaymentComponent } from './payment/payment.component';
import { UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

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
    PaymentComponent,
    UpperCasePipe,
    TranslateModule
  ],
  template: `
    <mat-stepper #stepper>
      <mat-step>
        <ng-template matStepLabel>{{ 'Wybierz miejsca' | uppercase | translate }}</ng-template>
        <app-hall
          [showing$]="showing$"
          [tickets$]="tickets$"
          (selectedSeat)="seatHandler($event)"
          (removedSeat)="removeSeatHandler($event)"></app-hall>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>{{ 'Wprowadź dane' | uppercase | translate }}</ng-template>
        <app-contact-form [showing$]="showing$" [promoCodes$]="promoCodes$"></app-contact-form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>{{ 'Płatność' | uppercase | translate }}</ng-template>
        <app-payment></app-payment>
      </mat-step>
    </mat-stepper>
  `,
  styles: [
    `
      .mat-mdc-form-field {
        margin-top: 16px;
      }

      ::ng-deep .mat-horizontal-stepper-header {
        pointer-events: none !important;
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
  @Input() promoCodes$!: Observable<PromoCode[]>;
  @Output() selectedSeat = new EventEmitter<{ seat: string; showingId: number }>();
  @Output() removeSeat = new EventEmitter<{ seat: string; showingId: number }>();

  seatHandler({ seat, showingId }: { seat: string; showingId: number }) {
    this.selectedSeat.emit({ seat, showingId });
  }

  removeSeatHandler({ seat, showingId }: { seat: string; showingId: number }) {
    this.removeSeat.emit({ seat, showingId });
  }
}
