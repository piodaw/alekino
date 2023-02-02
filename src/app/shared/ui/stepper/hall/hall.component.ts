import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';

import { ShowingById, Ticket } from 'src/app/features/home/shared/home.interfaces';
import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store';
import { CookieService } from 'ngx-cookie-service';
import { addMinutes } from 'date-fns';
import { MatIconModule } from '@angular/material/icon';

export interface SelectedTicket {
  ticket: string;
  ticket_type_id: number;
  name: string;
  price: string | number;
  description: string | null;
}

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
    NgClass,
    FormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <div class="reservation" *ngIf="showing$ | async as showing">
      <div class="info-wrapper">
        <p>
          {{ showing.title }}, sala nr {{ showing.hallno }}, {{ showing.start.split(' ')[0] }}, godz.
          {{ showing.start.split(' ')[1] }}
        </p>
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
              showing.bookedseats?.includes(row + column) ? 'reserved' : '',
              selectedSeats.includes(row + column) ? 'selected' : ''
            ]">
            {{ column }}
          </div>
        </div>
      </div>
      <form [formGroup]="seatsFormGroup" (ngSubmit)="firstStep()">
        <div class="tickets-wrapper" *ngFor="let ticket of selectedSeats; let i = index">
          <div class="ticket-info">
            <p>Rząd {{ ticket[0] }} Miejsce {{ ticket.slice(1) }}</p>
          </div>
          <mat-form-field class="ticket-select" appearance="fill">
            <mat-label>Rodzaj biletu</mat-label>
            <mat-select (ngModelChange)="ticketType(ticket, $event)" [formControlName]="ticket">
              <mat-option *ngFor="let ticket of tickets$ | async" [value]="ticket">
                {{ ticket.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div class="ticket-price">
            <ng-container *ngFor="let seat of selectedTickets">
              <ng-container *ngIf="seat.ticket === ticket && seat.price">
                <div style="width: {{ seat.price.toString().length * 10 + 20 }}px">{{ seat.price }} zł</div>
              </ng-container>
            </ng-container>
          </div>
          <div>
            <button mat-icon-button (click)="removeFromBookedSeats(ticket, showing.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
        <div class="button-wrapper">
          <button mat-raised-button type="submit" color="primary" matStepperNext [disabled]="!selectedTickets.length">
            Dalej
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./hall.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HallComponent implements OnInit {
  @Input() showing$!: Observable<ShowingById>;
  @Input() tickets$!: Observable<Ticket[]>;
  @Output() selectedSeat = new EventEmitter<{ seat: string; showingId: number }>();
  @Output() removedSeat = new EventEmitter<{ seat: string; showingId: number }>();

  private reservationsStore = inject(ReservationsStore);
  private cookieService = inject(CookieService);

  selectedSeats: string[] = [];
  selectedTickets: SelectedTicket[] = [];

  seatsFormGroup = new FormGroup({});

  ngOnInit() {
    this.selectedSeats.forEach(seat => {
      this.seatsFormGroup.addControl(`${seat}`, new FormControl('', Validators.required));
    });
  }

  addToBookedSeats(row: string, column: string, showingId: number) {
    const seat = row + column;
    if (!this.selectedSeats.includes(seat)) {
      this.selectedSeats.push(seat);
      this.seatsFormGroup.addControl(seat, new FormControl('', Validators.required));
      this.selectedSeat.emit({ seat, showingId });
    } else {
      this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat !== seat);
      this.seatsFormGroup.removeControl(seat);
      this.removedSeat.emit({ seat, showingId });
    }
  }

  removeFromBookedSeats(seat: string, showingId: number) {
    this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat !== seat);
    this.seatsFormGroup.removeControl(seat);
    this.removedSeat.emit({ seat, showingId });
  }

  ticketType(ticket: string, event: Ticket) {
    let ticketExists = false;

    this.selectedTickets.forEach((selectedTicket, index) => {
      if (selectedTicket.ticket === ticket) {
        this.selectedTickets[index] = { ticket, ...event };
        ticketExists = true;
      }
    });

    if (!ticketExists) {
      this.selectedTickets.push({ ticket, ...event });
    }
  }

  firstStep() {
    if (this.seatsFormGroup.invalid) {
      return;
    }

    this.reservationsStore.setState({
      ...this.selectedTickets,
    });

    const expires = addMinutes(new Date(), 15);
    const expiresInDays = (expires.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000);
    this.cookieService.set('selectedTickets', JSON.stringify(this.selectedTickets), expiresInDays);
  }
}
