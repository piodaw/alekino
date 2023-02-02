export interface ReservationState {
  ticket: string;
  ticket_type_id: number;
  name: string;
  price: string | number;
  description: string | null; 
}

import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

@Injectable()
export class ReservationsStore extends ComponentStore<ReservationState[]> {
  constructor() {
    super([]);
  }

  readonly selectedSeats = this.select((state) => state);
}

// how to use it ?
// import { ReservationsStore } from './reservations.store';

// @Component({
//   selector: 'app-hall',
//   standalone: true,
//   providers: [ReservationsStore],
//   template: `
//     <div class="reservation" *ngIf="showing$ | async as showing">
//       <div class="info-wrapper">
//         <p>
//           {{ showing.title }}, sala nr {{ showing.hallno }}, {{ showing.start.split(' ')[0] }}, godz.
//           {{ showing.start.split(' ')[1] }}
//         </p>
//       </div>
//       <div class="screen-wrapper">
//         <div class="screen"></div>
//         <p>Ekran</p>
//       </div>
//       <div class="hall">
//         <div class="hall-wrapper" *ngFor="let row of showing.rows">
//           <div class="rows">{{ row }}</div>
//           <div
//             class="columns"
//             *ngFor="let column of showing.columns"
//             (click)="addToBookedSeats(row, column, showing.id)"
//             [ngClass]="[
//               showing.bookedseats?.includes(row + column) ? 'reserved' : '',
//               selectedSeats.includes(row + column) ? 'selected' : ''
//             ]">
//             {{ column }}
//           </div>
//         </div>
//       </div>
//       <div class="reservation-wrapper">
//         <div class="reservation-info">
//           <p>Wybrane miejsca:</p>
//           <p>{{ selectedSeats }}</p>
//         </div>
//         <div class="reservation-info">
//           <p>Wybrane bilety:</p>
//           <p>{{ selectedTickets }}</p>
//         </div>
//         <div class="reservation-info">
//           <p>Łączna kwota:</p>
//           <p>{{ totalPrice }}</p>
//         </div>
//       </div>
//       <div class="reservation-buttons">
//         <button mat-raised-button color="primary" (click)="clearSeats()">Wyczyść</button>
//         <button mat-raised-button color="primary" (click)="clearTickets()">Wyczyść</button>
//         <button mat-raised-button color="primary" (click)="clearAll()">Wyczyść wszystko</button>
//       </div>
//     </div>
//   `,
//   styleUrls: ['reservations.component.scss'],
// })
// export class ReservationsComponent implements OnInit {
//   private store = inject(Store)
//   private activeRoute = inject(ActivatedRoute);
//   private reservationsStore = inject(ReservationsStore);

//   showing$ = this.store.select(selectShowingAndMovie)
//   tickets$ = this.store.select(selectTickets)

//   readonly selectedSeats = this.reservationsStore.select((state) => state.selectedSeats);
//   readonly selectedTickets = this.reservationsStore.select((state) => state.selectedTickets);
//   readonly totalPrice = this.reservationsStore.select((state) => state.totalPrice);

//   constructor() {}

//   ngOnInit(): void {
//     this.activeRoute.params.subscribe((params) => {
//       this.store.dispatch(loadShowing({ id: params.id }));
//       this.store.dispatch(loadTickets({ id: params.id }));
//     });

//     this.tickets$.subscribe((tickets) => {
//       this.reservationsStore.setState({
//         ...this.reservationsStore.getState(),
//         tickets,
//       });

//       this.reservationsStore.setState({
//         ...this.reservationsStore.getState(),
//         selectedTickets: tickets.map((ticket) => ticket.name),