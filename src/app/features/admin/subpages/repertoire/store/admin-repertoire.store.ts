import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { filter, map, Observable, switchMap, tap } from 'rxjs'

import { Hall, Movie, Showing, ShowingData } from 'src/app/features/admin/shared/admin.interceptors'
import { AdminRepertoireService } from 'src/app/features/admin/services/admin-repertoire.service'

export interface AdminRepertoireState {
  movies: Movie[];
  selectedDate: string;
  halls: Hall[];
  showings: Showing[];
}

@Injectable()
export class AdminRepertoireStore extends ComponentStore<AdminRepertoireState> {
  private repertoireService = inject(AdminRepertoireService)

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
      // reverse date
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

  readonly updateMovies = this.updater((state, movies: Movie[]) => {
    return {
      ...state,
      movies
    }
  })

  readonly updateHalls = this.updater((state, halls: Hall[]) => {
    return {
      ...state,
      halls
    }
  })

  readonly updateShowings = this.updater((state, showings: Showing[]) => {
    return {
      ...state,
      showings
    }
  })

  readonly updateSelectedDate = this.updater((state, selectedDate: string) => {
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
      switchMap((data) => this.repertoireService.createShowing(data)),
      tap(() => {
        this.getShowings(
          this.state$.pipe(
            map(
              (state) => state.selectedDate
            )
          )
        )
      })
    )
  })
}