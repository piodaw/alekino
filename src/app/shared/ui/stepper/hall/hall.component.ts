import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';

import { ShowingById, Ticket } from 'src/app/features/home/shared/home.interfaces'

@Component({
  selector: 'app-hall',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  template: `
    {{ tickets$ | async | json }}
    <div class="reservation" *ngIf="showing$ | async as showing">
      <div class="info-wrapper">
        <p>{{ showing.title }}, sala nr {{ showing.hallno }}, {{ showing.start.split(" ")[0] }}, godz. {{ showing.start.split(" ")[1] }}</p>
      </div>
      <div class="screen-wrapper">
        <div class="screen"></div>
        <p>Ekran</p>
      </div>
      <div class="hall">
        <div class="hall-wrapper" *ngFor="let row of showing.rows">
          <div class="rows">{{ row }}</div>
          <div 
            class="columns" 
            *ngFor="let column of showing.columns" 
            (click)="addToBookedSeats(row, column, showing.id)"
            [ngClass]="[
              showing.bookedseats.includes(row + column) ? 'reserved' : '',
              selectedSeats.includes(row + column) ? 'selected' : ''
            ]"
          >
            {{ column }}
          </div>
        </div>
      </div>
      <div *ngFor="let ticket of selectedSeats">
        <div>
          <p>Rząd {{ ticket[0] }} Miejsce {{ ticket.slice(1) }}</p>
        </div>
        <div>
          <select>
            <option value="normalny">Normalny</option>
          </select>
        </div>
      </div>
      <div class="button-wrapper">
        <button mat-raised-button color="primary" matStepperNext>Next</button>
      </div>
    </div>
  `,
  styles: [
    `
      .reservation {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .info-wrapper {
        display: flex;
        justify-content: center;
        font-size: 24px;
      }
      
      .screen-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .screen {
        width: 70%;
        height: 5px;
        background-color: var(--text-secondary);
        margin: 0 auto;
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
        width: 40px;
        height: 40px;
        border: 1px solid var(--secondary);
        background-color: var(--secondaryDark);
      }
      
      .columns {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border: 1px solid var(--secondary);
        background-color: var(--primaryLight);
        cursor: pointer;
      }
      
      .button-wrapper {
        display: flex;
        justify-content: center;
      }
      
      .reserved {
        background-color: var(--mdc-filled-button-disabled-container-color);
      }
      
      .selected {
        background-color: var(--info);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HallComponent {
  @Input() showing$!: Observable<ShowingById>;
  @Input() tickets$!: Observable<Ticket[]>
  @Output() selectedSeat = new EventEmitter<{seat: string, showingId: number}>();
  private formBuilder = inject(FormBuilder);

  selectedSeats: string[] = [];

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  addToBookedSeats(row: string, column: string, showingId: number) {
    this.selectedSeat.emit({ seat: `${row}${column}`, showingId })
    this.selectedSeats.push(`${row}${column}`);
  }
}
