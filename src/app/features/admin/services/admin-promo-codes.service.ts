import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import {
  CreatePromoCodeData,
  PromoCode,
  PromoCodeResponse,
  UpdatePromoCodeData
} from 'src/app/features/admin/shared/admin.interfaces'

@Injectable({
  providedIn: 'root'
})
export class AdminPromoCodesService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getPromoCodes() {
    return this.http.get<PromoCodeResponse>(`${this.base_url}/promo-codes`)
  }

  getPromoCode(id: number) {
    return this.http.get<PromoCode>(`${this.base_url}/promo-codes/${id}`)
  }

  createPromoCode(data: CreatePromoCodeData) {
    return this.http.post<PromoCodeResponse>(`${this.base_url}/promo-codes`, data)
  }

  deletePromoCode(id: number) {
    return this.http.delete<PromoCodeResponse>(`${this.base_url}/promo-codes/${id}`)
  }

  updatePromoCode(data: UpdatePromoCodeData) {
    return this.http.patch<PromoCodeResponse>(`${this.base_url}/promo-codes/${data.id}`, {
      code: data.updatedData.code,
      discount: data.updatedData.discount
    })
  }
}