import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { filter, map, Observable, switchMap, tap } from 'rxjs'

import { ErrorResponse, Hall, Movie, Showing, ShowingData } from 'src/app/features/admin/shared/admin.interfaces'
import { AdminRepertoireService } from 'src/app/features/admin/services/admin-repertoire.service'
import { Store } from '@ngrx/store'
import { ShowingsActions } from 'src/app/features/home/store/home.actions'
import { format } from 'date-fns'
import { ToastFacadeService } from '@shared/services/toast.facade.service'

export interface AdminRepertoireState {
  movies: Movie[];
  selectedDate: string;
  halls: Hall[];
  showings: Showing[];
}

@Injectable()
export class AdminRepertoireStore extends ComponentStore<AdminRepertoireState> {
  private repertoireService = inject(AdminRepertoireService)
  private toastService = inject(ToastFacadeService)
  private store = inject(Store)

  constructor() {
    super({
      movies: [],
      selectedDate: '',
      halls: [],
      showings: []
    });
  }

  readonly getMovies = this.effect(() => {
    return this.repertoireService.getMovies().pipe(
      tap((movies) => this.updateMovies(movies.movies)
    ))
  })

  readonly getHalls = this.effect(() => {
    return this.repertoireService.getHalls().pipe(
      tap((halls) => this.updateHalls(halls.halls)
    ))
  })

  readonly getShowings = this.effect((date: Observable<string>) => {
    return date.pipe(
      map((date) => {
        const [day, month, year] = date.split('-')
        return `${year}-${month}-${day}`
      }),
      filter((date) => date !== '' && date !== undefined),
      switchMap((date) => this.repertoireService.getShowings(date)),
      tap((showings) => this.updateShowings(showings.showings)
    ))
  })

  readonly reverseDate = this.effect((date: Observable<string>) => {
    return date.pipe(
      map((date) => {
        const [day, month, year] = date.split('-')
        return `${year}-${month}-${day}`
      }),
      tap((date) => this.updateSelectedDate(date)
    ))
  })

  readonly updateMovies = this.updater((state, movies: Movie[]): AdminRepertoireState => {
    return {
      ...state,
      movies
    }
  })

  readonly updateHalls = this.updater((state, halls: Hall[]): AdminRepertoireState => {
    return {
      ...state,
      halls
    }
  })

  readonly updateShowings = this.updater((state, showings: Showing[]): AdminRepertoireState => {
    return {
      ...state,
      showings
    }
  })

  readonly updateSelectedDate = this.updater((state, selectedDate: string): AdminRepertoireState => {
    return {
      ...state,
      selectedDate
    }
  })

  readonly createShowing = this.effect((showingData$: Observable<ShowingData>) => {
    return showingData$.pipe(
      map((data) => {
        const { hall_id, movie_id, start } = data
        return {
          hall_id,
          movie_id,
          start
        }
      }),
      switchMap((data) => this.repertoireService.createShowing(data).pipe(
        tapResponse(
          () => {
            const currentDate = format(new Date(), 'yyyy-MM-dd')
            this.store.dispatch(ShowingsActions.getShowings({ date: currentDate, filters: "day", hall_id: 1 }))
            this.getShowings(
              this.state$.pipe(
                map(
                  (state) => state.selectedDate
                )
              )
            )
          },
          (error: ErrorResponse) => this.toastService.showError(error.error.message, 'Błąd')
        )
      )),
    )
  })
}