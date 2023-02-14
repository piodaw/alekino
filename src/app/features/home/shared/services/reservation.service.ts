import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'

import { PromoCodeData, TicketsData } from 'src/app/features/home/shared/home.interfaces'
import { SuccessState } from 'src/app/features/home/subpages/success/store/success.store'
import { User, UserResponse } from 'src/app/features/home/subpages/reservations/store/reservations.store'

export interface PostReservationData {
  showingId: number
  seats: string[]
  user_id: number | null
  ticketNo: number
  blikCode: string
  firstName: string
  lastName: string
  phone: string
  email: string
  totalPrice: number
  newsletter: boolean
}

interface reservationResponse {
  message: {
    ticketno: string
  }
}

interface checkIfUserEmailIsInNewsletterData {
  newsletter: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getTickets() {
    return this.http.get<TicketsData>(`${this.base_url}/tickets`)
  }

  getMe() {
    return this.http.get<UserResponse>(`${this.base_url}/users/me`)
  }

  getTicket(ticket_no: string, secret: string) {
    return this.http.get<SuccessState>(`${this.base_url}/reservations/ticket/${ticket_no}`, {
      headers: {
        ticket_no: secret
      }
    })
  }

  getPromoCodes() {
    return this.http.get<PromoCodeData>(`${this.base_url}/promo-codes`)
  }

  checkIfUserEmailIsInNewsletter(email: string) {
    return this.http.post<checkIfUserEmailIsInNewsletterData>(`${this.base_url}/newsletter`, { email })
  }

  completeReservation(data: PostReservationData) {
    const { showingId, seats, user_id, ticketNo, blikCode, firstName, lastName, phone, totalPrice, email, newsletter } = data
    return this.http.post<reservationResponse>(`${this.base_url}/reservations`, {
      showing_id: showingId,
      seats,
      user_id: user_id || null,
      ticket_no: ticketNo,
      blik_code: blikCode,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      email,
      total_price: totalPrice,
      newsletter
    })
  }
}