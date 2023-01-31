import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'
import { ShowingResponse } from 'src/app/features/home/shared/home.interfaces'

@Injectable({
  providedIn: 'root'
})
export class ShowingService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getShowings(date: string, filters: string, hall_id: number) {
    return this.http.get<ShowingResponse>(`${this.base_url}/showings`, {
      params: {
        date,
        filters: `["${filters}"]`,
        hall_id,
      }
    })
  }
}