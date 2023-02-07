import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { MoviesResponse, PromoCodeResponse } from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class AdminMoviesService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getMovies() {
    return this.http.get<MoviesResponse>(`${this.base_url}/movies`)
  }
}