import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { ReservationResponse } from 'src/app/features/admin/shared/admin.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AdminTicketService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getTickets() {
    return this.http.get<ReservationResponse>(`${this.base_url}/reservations`)
  }
}