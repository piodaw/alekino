import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { PromoCodeResponse } from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class AdminPromoCodesService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getPromoCodes() {
    return this.http.get<PromoCodeResponse>(`${this.base_url}/promo-codes`)
  }
}