import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  MovieActions,
  MovieApiActions, ReservationActions, ReservationApiActions,
  ShowingsActions,
  ShowingsApiActions, TicketActions, TicketApiActions
} from 'src/app/features/home/store/home.actions'
import { catchError, combineLatest, map, of, switchMap } from 'rxjs'
import { addMinutes, compareAsc, format } from 'date-fns'

import { MovieService } from 'src/app/features/home/shared/services/movie.service'
import { ShowingService } from 'src/app/features/home/shared/services/showing.service'
import { ShowingWMovie } from '../shared/home.interfaces'
import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { MyTicketsService } from 'src/app/features/home/shared/services/my-tickets.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { ToastFacadeService } from '@shared/services/toast.facade.service'
import { Routing } from '@shared/routes/routing'

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions)
  private movieService = inject(MovieService)
  private showingService = inject(ShowingService)
  private reservationService = inject(ReservationService)
  private myTicketsService = inject(MyTicketsService)
  private cookieService = inject(CookieService)
  private toastService = inject(ToastFacadeService)
  private router = inject(Router)

  getMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap(() => this.movieService.getMovies()),
      map((movie) => MovieApiActions.getMoviesSuccess({ MovieData: movie })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać filmów', 'Błąd')
        return of(MovieApiActions.getMoviesFailure())
      })
    )
  })

  getShowings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.getShowings),
      map(({ date }) => {
        const currentDate = new Date()
        const selectedDate = new Date(date)
        if (compareAsc(selectedDate, currentDate) === -1) {
          this.router.navigate([], {
            queryParams: { date: format(currentDate, 'dd/MM') },
          })
          return { date: currentDate.toISOString() }
        } else {
          return { date }
        }
      }),
      switchMap(({ date }) =>
        combineLatest([
          this.movieService.getMovies(),
          this.showingService.getShowings(date)
        ])
      ),
      map(([movies, showings]) => {
        const ShowingData: ShowingWMovie[] = [];
        showings.showings.sort((a, b) => {
          return compareAsc(new Date(a.start), new Date(b.start));
        });
        showings.showings.forEach(showing => {
          const movie = movies.movies.find(movie => movie.id === showing.movieid);
          const movieIndex = ShowingData.findIndex(m => m.id === movie?.id);
          if (movieIndex >= 0) {
            ShowingData[movieIndex].showings.push(showing);
          } else {
            ShowingData.push({ ...movie, showings: [showing] });
          }
        });
        return ShowingsApiActions.getShowingsSuccess({ Showing: { showings: ShowingData } });
      }),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać seansów', 'Błąd')
        return of(ShowingsApiActions.getShowingsFailure());
      })
    );
  });

  getShowingById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.getShowing),
      switchMap(({ showingId }) => this.showingService.getShowingById(showingId)),
      map(({showing}) => {
        if (compareAsc(new Date(showing.start), new Date()) === -1) {
          this.router.navigate([Routing.HOME])
          return ShowingsApiActions.getShowingFailure()
        }
        return ShowingsApiActions.getShowingSuccess({ Showing: showing })
      }),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać seansu', 'Błąd')
        return of(ShowingsApiActions.getShowingFailure())
      })
    )
  })

  addBookedSeat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.updateShowingBookedSeats),
      switchMap(({ showingId, seat }) => this.showingService.addToBookedSeats(showingId, seat).pipe(
        map((showing) => ShowingsApiActions.getShowingSuccess({ Showing: showing })),
        catchError((error) => {
          this.toastService.showError(error.error.message, 'Błąd')
          return of(ShowingsApiActions.getShowingFailure())
        })
      )),
    )
  })

  removeFromBookedSeats$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.removeShowingBookedSeats),
      switchMap(({ showingId, seat }) => this.showingService.removeFromBookedSeats(showingId, seat)),
      map((showing) => ShowingsApiActions.getShowingSuccess({ Showing: showing })),
      catchError(() => {
        this.toastService.showError('Nie udało się usunąć miejsca', 'Błąd')
        return of(ShowingsApiActions.getShowingFailure())
      })
    )
  })

  getTickets$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReservationActions.getTickets),
      switchMap(() => this.reservationService.getTickets()),
      map((tickets) => ReservationApiActions.getTicketsSuccess({ tickets: tickets })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać biletów', 'Błąd')
        return of(ReservationApiActions.getTicketsFailure())
      })
    )
  })

  addToWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.addToWishlist),
      switchMap(({ user_id, movie_id }) => this.movieService.addToWishlist(user_id, movie_id).pipe(
        map(() => {
          this.toastService.showSuccess('Dodano do ulubionych', 'Sukces')
          return MovieApiActions.addToWishlistSuccess()
        }),
        catchError((error) => {
          this.toastService.showError(error.error.message, 'Błąd')
          return of(MovieApiActions.addToWishlistFailure())
        })
      )),
    )
  })

  getPromoCodes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReservationActions.getPromocodes),
      switchMap(() => this.reservationService.getPromoCodes()),
      map((promoCodes) => ReservationApiActions.getPromocodesSuccess({ promoCodes: promoCodes })),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać kodów promocyjnych', 'Błąd')
        return of(ReservationApiActions.getPromocodesFailure())
      })
    )
  })

  getTicketByTicketNoAndEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TicketActions.getTicket),
      switchMap(({ ticket_no, email }) => this.myTicketsService.getTicketByTicketNoAndEmail(ticket_no, email)),
      map((ticket) => {
        if (ticket) {
          const expires = addMinutes(new Date(), 5);
          const expiresInDays = (expires.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000);
          this.cookieService.set('ticketNo', JSON.stringify(ticket.ticket_no), expiresInDays, '/success')
          this.router.navigate([`success/${ticket.ticket_no}`])
          return TicketApiActions.getTicketSuccess()
        } else {
          return TicketApiActions.getTicketFailure()
        }
      }),
      catchError(() => {
        this.toastService.showError('Nie udało się pobrać biletu', 'Błąd')
        return of(TicketApiActions.getTicketFailure())
      })
    )
  })

  rateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.rateMovie),
      switchMap(({ movie_id, rating, user_id }) => this.movieService.rateMovie(user_id, movie_id, rating).pipe(
        map(({ movie_id, rating }) => {
          this.toastService.showSuccess('Dodano ocenę', 'Sukces')
          return MovieApiActions.rateMovieSuccess({ movie_id, rating })
        }),
        catchError((error) => {
          this.toastService.showError(error.error.message, 'Błąd')
          return of(MovieApiActions.rateMovieFailure())
        })
      )),
    )
  })
}