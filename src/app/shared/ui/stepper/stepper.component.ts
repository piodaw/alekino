import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HallComponent } from './hall/hall.component';
import { Observable } from 'rxjs';
import { ShowingById, Ticket, TicketsData } from 'src/app/features/home/shared/home.interfaces'

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, HallComponent],
  template: `
    <mat-stepper #stepper>
      <mat-step [stepControl]="firstFormGroup" errorMessage="Musisz wybrać miejsca">
        <ng-template matStepLabel>Wybierz miejsca</ng-template>
        <app-hall [showing$]="showing$" [tickets$]="tickets$" (selectedSeat)="seatHandler($event)"></app-hall>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup" errorMessage="Dane są wymagane">
        <form [formGroup]="secondFormGroup">
          <ng-template matStepLabel>Wprowadź dane</ng-template>
          <mat-form-field appearance="fill">
            <mat-label>Address</mat-label>
            <input matInput placeholder="Ex. 1 Main St, New York, NY" formControlName="secondCtrl" required />
          </mat-form-field>
          <div>
            <p>Go to a different step to see the error state</p>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Płatność</ng-template>
        <p>You are now done.</p>
        <div>
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button (click)="stepper.reset()">Reset</button>
        </div>
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
  @Input() tickets$!: Observable<Ticket[]>
  @Output() selectedSeat = new EventEmitter<{ seat: string, showingId: number }>();

  private formBuilder = inject(FormBuilder);

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  seatHandler({ seat, showingId }: { seat: string, showingId: number }) {
    this.selectedSeat.emit({ seat, showingId });
  }
}
