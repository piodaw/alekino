import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, switchMap, tap } from 'rxjs'
import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { CookieService } from 'ngx-cookie-service'
import { addMinutes } from 'date-fns'
import { Router } from '@angular/router'
import { Routing } from '@shared/routes/routing'

export interface ReservationState {
  selectedTickets: Ticket[]
  userData: User
  totalPrice: number
  blikCode: string
  showingId: number
}

interface Ticket {
  ticket: string;
  ticket_type_id: number;
  name: string;
  price: number;
  description: string | null;
  showingId?: number;
}

export interface User {
  userId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  newsletter: boolean;
}

@Injectable()
export class ReservationsStore extends ComponentStore<ReservationState> {
  private reservationService = inject(ReservationService)
  private cookieService = inject(CookieService)
  private router = inject(Router)

  constructor() {
    super({
      selectedTickets: [],
      userData: {
        userId: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        newsletter: false,
      },
      blikCode: '',
      totalPrice: 0,
      showingId: 0,
    });
  }

  readonly removeSeatFromSelectedTickets = this.updater((state, seat: string): ReservationState => {
    return {
      ...state,
      selectedTickets: state.selectedTickets.filter((ticket) => ticket.ticket !== seat),
    };
  })

  readonly removeSeatFromCookies = this.effect((seat$: Observable<string>) => {
    return seat$.pipe(
      map((seat) => {
        const selectedTickets = this.cookieService.get('selectedTickets');
        if (selectedTickets.length > 1) {
          const updatedTickets = JSON.parse(selectedTickets).filter((ticket: Ticket) => ticket.ticket !== seat);
          const expires = addMinutes(new Date(), 15);
          const expiresInDays = (expires.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000);
          this.cookieService.set('selectedTickets', JSON.stringify(updatedTickets), expiresInDays, '/');
        } else {
          this.cookieService.delete('selectedTickets', '/');
        }
      })
    )
  })

  readonly addSeatToSelectedTickets = this.updater((state, seat: Ticket): ReservationState => {
    return {
      ...state,
      selectedTickets: [...state.selectedTickets, seat],
    };
  })

  readonly checkIfShowingIdIsTheSameAsInCookies = this.effect((showingId$: Observable<number>) => {
    return showingId$.pipe(
      map((showingId) => {
        const selectedTickets = this.cookieService.get('selectedTickets');
        if (selectedTickets) {
          const parsedTickets = JSON.parse(selectedTickets);
          if (parsedTickets[0].showingId !== showingId) {
            this.cookieService.delete('selectedTickets', '/');
          }
        }
      })
    )
  })

  readonly updateTicketType = this.updater((state, ticket: Ticket): ReservationState => {
    return {
      ...state,
      selectedTickets: state.selectedTickets.map((item) => {
        if (item.ticket === ticket.ticket) {
          return ticket
        }
        return item
      }),
    };
  })

  readonly checkIfUserEmailIsInNewsletter = this.effect((email$: Observable<string>) => {
    return email$.pipe(
      switchMap((email) => this.reservationService.checkIfUserEmailIsInNewsletter(email)),
      tap((response) => {
        this.updateUser({
          ...this.get().userData,
          newsletter: response.newsletter,
        })
      })
    )
  })

  readonly addSelectedTicketsToCookies = this.effect((selectedTickets$: Observable<Ticket[]>) => {
    return selectedTickets$.pipe(
      map((selectedTickets) => {
        selectedTickets.forEach((ticket) => {
          ticket['showingId'] = this.get().showingId;
        })
        const expires = addMinutes(new Date(), 15);
        const expiresInDays = (expires.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000);
        this.cookieService.set('selectedTickets', JSON.stringify(selectedTickets), expiresInDays, '/');
      })
    )
  })

  readonly getSelectedTicketsFromCookies = this.updater((state): ReservationState => {
    const selectedTickets = this.cookieService.get('selectedTickets');
    if (selectedTickets) {
      return {
        ...state,
        selectedTickets: JSON.parse(selectedTickets),
      };
    }
    return state;
  })

  readonly addTotalPrice = this.updater((state, totalPrice: number): ReservationState => {
    return {
      ...state,
      totalPrice,
    };
  })

  readonly addContactData = this.updater((state, userData: User): ReservationState => {
    return {
      ...state,
      userData,
    };
  })

  readonly getMe = this.effect(() => {
    return this.reservationService.getMe().pipe(
      tap((user) => {
        return this.updateUser(user)
      })
    );
  })

  readonly updateUser = this.updater((state, userData: User): ReservationState => {
    return {
      ...state,
      userData,
    };
  })

  readonly completeReservation = this.effect((reservationData$: Observable<ReservationState>) => {
    return reservationData$.pipe(
      map((reservationData) => {
        const { selectedTickets, userData, blikCode, totalPrice, showingId } = reservationData;
        const seats = selectedTickets.map((ticket) => ticket.ticket);
        return {
          showingId,
          seats,
          user_id: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phoneNumber,
          newsletter: userData.newsletter,
          blikCode,
          totalPrice,
          ticketNo: Math.floor(Math.random() * 1000000000),
        };
      }),
      switchMap((reservation) => this.reservationService.completeReservation(reservation)),
      tap((response) => {
        this.cookieService.delete('selectedTickets', '/');
        this.cookieService.set('ticketNo', response.message.ticketno, 1, '/');

        if (this.cookieService.get('ticketNo')) {
          this.router.navigate([`${Routing.SUCCESS}/${response.message.ticketno}`]);
        }
      }
    ));
  })
}