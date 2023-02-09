import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { WishListResponse } from '../home.interfaces'

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getUserWishlist(userId: number) {
    return this.http.get<WishListResponse>(`${this.base_url}/wishlist/${userId}`)
  }

  removeWishListItem(wishlistId: number) {
    return this.http.delete<{ message: string }>(`${this.base_url}/wishlist/${wishlistId}`)
  }
}