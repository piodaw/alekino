import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from '@core/env.token';
import { LoginResponse } from '..';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private base_url = inject(API_URL);

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.base_url}/auth/login`, { email, password });
  }

  register(firstName: string, lastName: string, phoneNumber: string, email: string, password: string) {
    return this.http.post(`${this.base_url}/users`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role: 0,
    });
  }
}
