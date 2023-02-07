import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { tap } from 'rxjs'

import { Movie } from 'src/app/features/admin/shared/admin.interceptors'
import { AdminMoviesService } from 'src/app/features/admin/services/admin-movies.service'

export interface AdminMoviesState {
  movies: Movie[]
}

@Injectable()
export class AdminMoviesStore extends ComponentStore<AdminMoviesState> {
  private adminMoviesService = inject(AdminMoviesService)

  constructor() {
    super({
      movies: []
    });
  }

  readonly getMovies = this.effect(() => {
    return this.adminMoviesService.getMovies().pipe(
      tap(({ movies }) => this.setMovies(movies))
    )
  })

  readonly setMovies = this.updater((state, movies: Movie[]) => {
    return {
      ...state,
      movies
    }
  })
}