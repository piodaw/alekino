import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'

import {
  HallResponse,
  MovieResponse,
  ShowingData,
  ShowingResponse
} from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class AdminRepertoireService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getMovies() {
    return this.http.get<MovieResponse>(`${this.base_url}/movies`)
  }

  getHalls() {
    return this.http.get<HallResponse>(`${this.base_url}/halls`)
  }

  getShowings(date: string) {
    return this.http.get<ShowingResponse>(`${this.base_url}/showings`, {
      params: {
        date,
        filters: `["day", "week", "year"]`,
        hall_id: 1,
      },
    });
  }

  createShowing(showing: ShowingData) {
    return this.http.post<ShowingResponse>(`${this.base_url}/showings`, showing)
  }
}