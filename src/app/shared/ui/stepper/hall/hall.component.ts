import { AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { map, Observable, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { ShowingById, Ticket } from 'src/app/features/home/shared/home.interfaces';
import { ReservationsStore } from 'src/app/features/home/subpages/reservations/store/reservations.store';

export interface SelectedTicket {
  ticket: string;
  ticket_type_id: number;
  name: string;
  price: number;
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
              showing.bookedseats?.includes(row + column) || showing.paidseats.includes(row + column) ? 'reserved' : '',
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
          <mat-form-field class="ticket-select" appearance="fill" color="accent">
            <mat-label>Rodzaj biletu</mat-label>
            <mat-select
              [compareWith]="compareFn"
              (ngModelChange)="ticketType(ticket, $event)"
              [formControlName]="ticket">
              <mat-option *ngFor="let ticket of tickets$ | async" [value]="ticket">
                {{ ticket.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div class="ticket-price">
            <ng-container *ngFor="let seat of selectedTickets$ | async">
              <ng-container *ngIf="seat.ticket === ticket && seat.price">
                <div style="width: {{ seat.price.toString().length * 10 + 20 }}px">{{ seat.price }} zł</div>
              </ng-container>
            </ng-container>
          </div>
          <div>
            <button mat-icon-button (click)="removeTicketFromSelectedTickets(ticket, showing.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
        <div class="button-wrapper" *ngIf="selectedTickets$ | async as seat">
          <button
            mat-raised-button
            type="submit"
            color="primary"
            matStepperNext
            [disabled]="seat.length < selectedSeats.length || seat.length === 0">
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

  selectedTickets$ = this.reservationsStore.state$.pipe(map(state => state.selectedTickets));

  selectedSeats: string[] = [];

  seatsFormGroup = new FormGroup({});

  ngOnInit() {
    this.selectedSeats.forEach(seat => {
      this.seatsFormGroup.addControl(`${seat}`, new FormControl('', Validators.required));
    });

    this.reservationsStore.getSelectedTicketsFromCookies();

    this.selectedTickets$
      .subscribe(tickets => {
        tickets.forEach(ticket => {
          this.seatsFormGroup.addControl(`${ticket.ticket}`, new FormControl('', Validators.required));
          this.selectedSeats.push(ticket.ticket);
          this.seatsFormGroup.patchValue({ [ticket.ticket]: ticket });
        });
      })
      .unsubscribe();
  }

  compareFn(o1: Ticket, o2: Ticket): boolean {
    return o1 && o2 ? o1.ticket_type_id === o2.ticket_type_id : o1 === o2;
  }

  addToBookedSeats(row: string, column: string, showingId: number) {
    const seat = row + column;
    this.showing$.pipe(take(1)).subscribe(showing => {
      if (!showing.bookedseats?.includes(seat)) {
        this.selectedSeats.push(seat);
        this.seatsFormGroup.addControl(seat, new FormControl('', Validators.required));
        this.selectedSeat.emit({ seat, showingId });
        return;
      }

      if (this.selectedSeats.includes(seat)) {
        this.removeFromBookedSeats(seat, showingId);
        return;
      }
    });
  }

  removeTicketFromSelectedTickets(seat: string, showingId: number) {
    this.removeFromBookedSeats(seat, showingId);
  }

  private removeFromBookedSeats(seat: string, showingId: number) {
    this.selectedSeats = this.selectedSeats.filter(selectedSeat => selectedSeat !== seat);
    this.seatsFormGroup.removeControl(seat);
    this.removedSeat.emit({ seat, showingId });
    this.reservationsStore.removeSeatFromSelectedTickets(seat);
    this.reservationsStore.removeSeatFromCookies(seat);
  }

  ticketType(ticket: string, event: Ticket) {
    let ticketExists = false;

    this.reservationsStore.state$.pipe(take(1)).subscribe(state => {
      state.selectedTickets.forEach(selectedTicket => {
        if (selectedTicket.ticket === ticket) {
          ticketExists = true;
          this.reservationsStore.updateTicketType({ ticket, ...event });
        }
      });
    });

    if (!ticketExists) {
      this.reservationsStore.addSeatToSelectedTickets({ ticket, ...event });
    }
  }

  firstStep() {
    if (this.seatsFormGroup.invalid) {
      return;
    }

    this.reservationsStore.addSelectedTicketsToCookies(this.selectedTickets$);
  }
}
