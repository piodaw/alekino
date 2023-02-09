import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '@core/env.token'

import {
  Hall,
  HallResponse, HellByIdResponse
} from 'src/app/features/admin/shared/admin.interceptors'

export interface CreateHallResponse {
  isError: boolean;
  halls: Hall[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminHallsService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  getHalls() {
    return this.http.get<HallResponse>(`${this.base_url}/halls`)
  }

  getHallById(hall_id: number) {
    return this.http.get<HellByIdResponse>(`${this.base_url}/halls/${hall_id}`)
  }

  updateHall(hall_id: number, rows: number, columns: number) {
    return this.http.patch<CreateHallResponse>(`${this.base_url}/halls/${hall_id}`, { rows, columns })
  }

  createHall() {
    return this.http.post<CreateHallResponse>(`${this.base_url}/halls`, {})
  }

  deleteHall(hall_id: number) {
    return this.http.delete<CreateHallResponse>(`${this.base_url}/halls/${hall_id}`)
  }
}