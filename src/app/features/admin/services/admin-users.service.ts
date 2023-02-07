import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { UsersResponseData } from 'src/app/features/admin/shared/admin.interceptors'

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getUsers() {
    return this.http.get<UsersResponseData>(`${this.base_url}/users`)
  }
}