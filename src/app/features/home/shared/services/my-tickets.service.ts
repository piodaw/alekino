import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { MyTicketsResponse } from 'src/app/features/home/subpages/my-tickets/store/my-tickets.store'

@Injectable({
  providedIn: 'root'
})
export class MyTicketsService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getMyTickets(userId: number) {
    return this.http.get<MyTicketsResponse>(`${this.base_url}/reservations/${userId}`)
  }

  getTicketByTicketNoAndEmail(ticket_no: number, email: string) {
    return this.http.post<{ ticket_no: number }>(`${this.base_url}/reservations/ticket`, {
      ticket_no: String(ticket_no),
      email
    }, {
      headers: {
        ticket_no: String(ticket_no),
      }
    })
  }

  refundTicket(ticket_no: number) {
    return this.http.patch<{ message: string }>(`${this.base_url}/reservations/${ticket_no}`, {})
  }
}