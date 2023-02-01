import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'

import { TicketsData } from 'src/app/features/home/shared/home.interfaces'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getTickets() {
    return this.http.get<TicketsData>(`${this.base_url}/tickets`)
  }
}