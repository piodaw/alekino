import { inject, Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { API_URL } from '@core/env.token'
import { UserApiActions } from '@core/store/user.actions'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { User } from '@core/store/user.interfaces'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private base_url = inject(API_URL);
  private cookieService = inject(CookieService);
  private store = inject(Store);

  getUser() {
    this.getMe().subscribe(response => {
      this.store.dispatch(UserApiActions.getUserSuccess({ user: response }));
    });
  }

  getMe() {
    return this.http.get<User>(`${this.base_url}/users/me`, {
      headers: {
        Authorization: `Bearer ${this.cookieService.get('token')}`,
      },
    });
  }
}