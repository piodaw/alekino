import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { catchError, Observable, switchMap, tap } from 'rxjs'
import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { Routing } from '@shared/routes/routing'

export interface SuccessState {
  ticket: Ticket
}

export interface Ticket {
  ticketno: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  seats: string[];
  email: string;
  totalprice: number;
  start: string;
  hallno: number;
  title: string;
}

@Injectable()
export class SuccessStore extends ComponentStore<SuccessState> {
  private reservationService = inject(ReservationService)
  private cookieService = inject(CookieService)
  private router = inject(Router)

  constructor() {
    super({
      ticket: {
        ticketno: 0,
        firstname: '',
        lastname: '',
        phonenumber: '',
        seats: [],
        email: '',
        totalprice: 0,
        start: '',
        hallno: 0,
        title: '',
      }
    });
  }

  readonly getTicket = this.effect((ticketno$: Observable<string>) => {
    return ticketno$.pipe(
      switchMap((ticketno) => {
        return this.reservationService.getTicket(
          ticketno,
          this.cookieService.get('ticketNo')
        )
      }),
      tap((ticket) => this.updateTicket(ticket.ticket)),
      catchError(() => this.router.navigate([Routing.HOME])
    ))
  })

  readonly updateTicket = this.updater((state, ticket: Ticket): SuccessState => {
    return {
      ...state,
      ticket
    }
  })
}