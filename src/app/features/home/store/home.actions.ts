import { createActionGroup, emptyProps, props } from '@ngrx/store'

import {
  Movie,
  MovieResponse, PromoCodeData,
  ShowingById,
  ShowingData, TicketsData
} from 'src/app/features/home/shared/home.interfaces'

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'get movies': emptyProps(),
    'update movies': props<{ movieId: string, updatedData: Partial<Movie> }>(),

    'add to wishlist': props<{ user_id: number, movie_id: number }>(),
    'remove from wishlist': props<{ wishlist_id: number }>()
  }
})

export const MovieApiActions = createActionGroup({
  source: 'Movie API',
  events: {
    'get movies success': props<{ MovieData: MovieResponse }>(),
    'get movies failure': emptyProps(),

    'update movies success': emptyProps(),
    'update movies failure': emptyProps(),

    'add to wishlist success': emptyProps(),
    'add to wishlist failure': emptyProps(),
  }
})

export const ShowingsActions = createActionGroup({
  source: 'Showings',
  events: {
    'get showings': props<{ date: string, filters: string, hall_id: number }>(),

    'get showing': props<{ showingId: number }>(),

    'update showing booked seats': props<{ showingId: number, seat: string }>(),
    'remove showing booked seats': props<{ showingId: number, seat: string }>(),
  }
})

export const ShowingsApiActions = createActionGroup({
  source: 'Showings API',
  events: {
    'get showings success': props<{ Showing: ShowingData }>(),
    'get showings failure': emptyProps(),

    'get showing success': props<{ Showing: ShowingById }>(),
    'get showing failure': emptyProps(),
  }
})

export const ReservationActions = createActionGroup({
  source: 'Reservation',
  events: {
    'get tickets': emptyProps(),

    'get promoCodes': emptyProps(),
  }
})

export const ReservationApiActions = createActionGroup({
  source: 'Reservation API',
  events: {
    'get tickets success': props<{ tickets: TicketsData }>(),
    'get tickets failure': emptyProps(),

    'get promoCodes success': props<{ promoCodes: PromoCodeData }>(),
    'get promoCodes failure': emptyProps(),
  }
})

export const TicketActions = createActionGroup({
  source: 'Ticket',
  events: {
    'get ticket': props<{ ticket_no: number, email: string }>(),
  }
})

export const TicketApiActions = createActionGroup({
  source: 'Ticket API',
  events: {
    'get ticket success': emptyProps(),
    'get ticket failure': emptyProps(),
  }
})