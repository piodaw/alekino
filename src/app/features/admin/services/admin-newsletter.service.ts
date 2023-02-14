import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { Newsletter, NewsletterByIdResponse, NewsletterResponse } from 'src/app/features/admin/shared/admin.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AdminNewsletterService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getNewsletter() {
    return this.http.get<NewsletterResponse>(`${this.base_url}/newsletter`)
  }

  getNewsletterById(id: number) {
    return this.http.get<NewsletterByIdResponse>(`${this.base_url}/newsletter/${id}`)
  }

  updateNewsletter(id: number, email: string) {
    return this.http.patch<Newsletter[]>(`${this.base_url}/newsletter/${id}`, { email })
  }

  removeNewsletter(id: number) {
    return this.http.delete(`${this.base_url}/newsletter/${id}`)
  }
}