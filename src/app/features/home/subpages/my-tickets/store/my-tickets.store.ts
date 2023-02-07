import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { catchError, filter, Observable, switchMap, tap } from 'rxjs'

import { Newsletter } from 'src/app/features/admin/shared/admin.interceptors'
import { MyTicketsService } from 'src/app/features/home/shared/services/my-tickets.service'
import { User } from '@core/store/user.interfaces'

export interface MyTicketsResponse {
  count: number;
  tickets: Tickets[];
  ticket: Tickets;
}

export interface Tickets {
  ticketno: number;
  title: string;
  start: string;
  seats: string[];
  hallno: string;
  totalprice: number;
}

export interface MyTicketsState {
  tickets: Tickets[];
  ticket: Tickets;
}

@Injectable()
export class MyTicketsStore extends ComponentStore<MyTicketsState> {

  private myTicketsService = inject(MyTicketsService)

  constructor() {
    super({
      tickets: [],
      ticket: {
        ticketno: 0,
        title: '',
        start: '',
        seats: [],
        hallno: '',
        totalprice: 0
      }
    });
  }

  readonly getMyTickets = this.effect((userId$: Observable<User>) => {
    return userId$.pipe(
      filter(({ userId }) => !!userId),
      tap(({ userId }) => {
        this.myTicketsService.getMyTickets(userId).subscribe((res) => {
          this.patchState({
            tickets: res.tickets
          })
        })
      }
    ))
  })

  readonly findTicket = this.effect((ticketNo$: Observable<number>) => {
    return ticketNo$.pipe(
      filter((ticketNo) => !!ticketNo),
      tap((ticketNo) => {
        const ticket = this.get().tickets.find((ticket) => ticket.ticketno === ticketNo)
        this.patchState({
          ticket
        })
      })
    )
  })

  readonly refundTicket = this.effect((ticketNo$: Observable<number>) => {
    return ticketNo$.pipe(
      filter((ticketNo) => !!ticketNo),
      switchMap((ticketNo) => {
        const tickets = this.get().tickets.filter((ticket) => ticket.ticketno !== ticketNo)
        return this.myTicketsService.refundTicket(ticketNo).pipe(
          tapResponse(
            (res) => {
              console.log(res.message)
              this.patchState({
                tickets
              })
            },
            (err: any) => {
              console.log(err.error.message)
            }
          ),
        )
      })
    )
  })
}