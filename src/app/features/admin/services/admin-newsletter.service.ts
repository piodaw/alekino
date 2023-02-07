import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { NewsletterResponse } from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class AdminNewsletterService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getNewsletter() {
    return this.http.get<NewsletterResponse>(`${this.base_url}/newsletter`)
  }
}