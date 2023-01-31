import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'
import { Movie, MovieResponse } from 'src/app/features/home/shared/home.interfaces'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getMovies() {
    return this.http.get<MovieResponse>(`${this.base_url}/movies`)
  }
}