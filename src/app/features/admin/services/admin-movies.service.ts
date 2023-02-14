import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { Movie, MovieByIdResponse, MoviesResponse } from 'src/app/features/admin/shared/admin.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AdminMoviesService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getMovies() {
    return this.http.get<MoviesResponse>(`${this.base_url}/movies`)
  }

  getMovieById(id: number) {
    return this.http.get<MovieByIdResponse>(`${this.base_url}/movies/${id}`)
  }

  deleteMovie(id: number) {
    return this.http.delete<MoviesResponse>(`${this.base_url}/movies/${id}`)
  }

  createMovie(movie: Movie) {
    return this.http.post<MoviesResponse>(`${this.base_url}/movies`, movie)
  }

  updateMovie(movie: Movie) {
    return this.http.patch<MoviesResponse>(`${this.base_url}/movies/${movie.id}`, movie)
  }
}