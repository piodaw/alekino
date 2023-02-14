import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'

import { ErrorResponse, Movie } from 'src/app/features/admin/shared/admin.interfaces'
import { AdminMoviesService } from 'src/app/features/admin/services/admin-movies.service'
import { ToastFacadeService } from '@shared/services/toast.facade.service'

export interface AdminMoviesState {
  movies: Movie[]
  movie: Movie
}

@Injectable()
export class AdminMoviesStore extends ComponentStore<AdminMoviesState> {
  private adminMoviesService = inject(AdminMoviesService)
  private toastService = inject(ToastFacadeService)

  constructor() {
    super({
      movies: [],
      movie: {
        id: 0,
        title: '',
        duration: '',
        genre: [],
        ispremiere: false,
        description: '',
        shortdescription: '',
        age: '',
        img: '',
        rating: 0,
      }
    });
  }

  readonly getMovies = this.effect(() => {
    return this.adminMoviesService.getMovies().pipe(
      tap(({ movies }) => this.setMovies(movies))
    )
  })

  readonly setMovies = this.updater((state, movies: Movie[]): AdminMoviesState => {
    return {
      ...state,
      movies
    }
  })

  readonly getMovieById = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => this.adminMoviesService.getMovieById(id).pipe(
        tapResponse(
          ({ movie }) => {
            this.patchState({
              movie
            })
          },
          () => {
            this.toastService.showError('Nie znaleziono filmu', 'Błąd')
          },
        )
      ))
    )
  })

  readonly deleteMovie = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => this.adminMoviesService.deleteMovie(id).pipe(
        tapResponse(
          ({ movies, message }) => {
            this.toastService.showSuccess(message!, 'Sukces')
            this.patchState({
              movies
            })
          },
          (err: ErrorResponse) => {
            this.toastService.showError(err.error.message, 'Błąd')
          }
        )
      ))
    )
  })

  readonly createMovie = this.effect((movie$: Observable<Movie>) => {
    return movie$.pipe(
      switchMap((movie) => this.adminMoviesService.createMovie(movie).pipe(
        tapResponse(
          ({ movies, message }) => {
            this.toastService.showSuccess(message!, 'Sukces')
            this.patchState({
              movies
            })
          },
          (err: ErrorResponse) => {
            this.toastService.showError(err.error.message, 'Błąd')
          }
        )
      ))
    )
  })

  readonly updateMovie = this.effect((movie$: Observable<Movie>) => {
    return movie$.pipe(
      switchMap((movie) => this.adminMoviesService.updateMovie(movie).pipe(
        tapResponse(
          ({ movies, message }) => {
            this.toastService.showSuccess(message!, 'Sukces')
            this.patchState({
              movies
            })
          },
          (err: ErrorResponse) => {
            this.toastService.showError(err.error.message, 'Błąd')
          }
        )
      ))
    )
  })
}