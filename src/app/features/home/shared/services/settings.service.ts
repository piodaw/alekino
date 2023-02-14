import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { API_URL } from '@core/env.token'
import { UserData } from '../../subpages/settings/settings.interfaces'
import { Newsletter } from 'src/app/features/admin/shared/admin.interfaces'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private http = inject(HttpClient)
  private base_url = inject(API_URL)

  updateUserData(data: Partial<UserData>) {
    return this.http.patch<{ message: string, accessToken: string }>(`${this.base_url}/users/${data.userId}`, {
      newEmail: data.newEmail,
      newPassword: data.newPassword,
      oldEmail: data.oldEmail,
      oldPassword: data.oldPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone
    })
  }

  addUserToNewsletter(email: string) {
    return this.http.post<Newsletter>(`${this.base_url}/newsletter/create`, {
      email
    })
  }

  removeUserFromNewsletter(email: string) {
    return this.http.post<Newsletter>(`${this.base_url}/newsletter/delete`, {
      email
    })
  }
}