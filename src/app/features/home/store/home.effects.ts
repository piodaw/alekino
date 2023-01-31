import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  MovieActions,
  MovieApiActions,
  ShowingsActions,
  ShowingsApiActions
} from 'src/app/features/home/store/home.actions'
import { catchError, combineLatest, EMPTY, forkJoin, from, map, mergeMap, of, switchMap, toArray } from 'rxjs'

import { MovieService } from 'src/app/features/home/shared/services/movie.service'
import { ShowingService } from 'src/app/features/home/shared/services/showing.service'
import { Showing, ShowingData, ShowingWMovie } from '../shared/home.interfaces'
import { compareAsc } from 'date-fns'

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions)
  private movieService = inject(MovieService)
  private showingService = inject(ShowingService)

  getMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.getMovies),
      switchMap(() => this.movieService.getMovies()),
      map((movie) => MovieApiActions.getMoviesSuccess({ MovieData: movie })),
      catchError(() => of(MovieApiActions.getMoviesFailure()))
    )
  })

  // getShowings$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ShowingsActions.getShowings),
  //     switchMap(({ date, filters, hall_id }) => this.showingService.getShowins(date, filters, hall_id)),
  //     map((showing) => ShowingsApiActions.getShowingsSuccess({ ShowingData: showing })),
  //     catchError(() => of(ShowingsApiActions.getShowingsFailure()))
  //   )
  // })

  getShowings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShowingsActions.getShowings),
      switchMap(({ date, filters, hall_id }) =>
        combineLatest([
          this.movieService.getMovies(),
          this.showingService.getShowings(date, filters, hall_id)
        ])
      ),
      map(([movies, showings]) => {
        let ShowingData: ShowingWMovie[] = [];
        showings.showings.sort((a, b) => {
          return compareAsc(new Date(a.start), new Date(b.start));
        });
        showings.showings.forEach(showing => {
          const movie = movies.movies.find(movie => movie.id === showing.movieid);
          let movieIndex = ShowingData.findIndex(m => m.id === movie?.id);
          if (movieIndex >= 0) {
            ShowingData[movieIndex].showings.push(showing);
          } else {
            ShowingData.push({ ...movie, showings: [showing] });
          }
        });
        return ShowingsApiActions.getShowingsSuccess({ Showing: { showings: ShowingData } });
      }),
      catchError(() => of(ShowingsApiActions.getShowingsFailure()))
    );
  });
}