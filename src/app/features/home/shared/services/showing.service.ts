import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { ShowingById, ShowingResponse } from 'src/app/features/home/shared/home.interfaces'
import { ShowingData } from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class ShowingService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getShowings(date: string) {
    return this.http.get<ShowingResponse>(`${this.base_url}/showings`, {
      params: {
        date,
        filters: `["day", "week", "year"]`,
        hall_id: 1,
      }
    })
  }

  getShowingById(showingId: number) {
    return this.http.get<ShowingById>(`${this.base_url}/showings/${showingId}/movie`)
  }

  addToBookedSeats(id: number, seat: string) {
    return this.http.patch<ShowingById>(`${this.base_url}/showings/${id}/booked`, {
      seats: seat
    })
  }

  removeFromBookedSeats(id: number, seat: string) {
    return this.http.patch<ShowingById>(`${this.base_url}/showings/${id}/remove`, {
      seats: seat
    })
  }
}