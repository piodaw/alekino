import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CookieService } from 'ngx-cookie-service'
import { catchError, map, of, switchMap } from 'rxjs'

import { AuthService } from '../'
import { AuthActions, AuthApiActions } from 'src/app/features/auth/store/auth.actions'
import { UserApiActions } from '@core/store/user.actions'

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions)
  private cookieService = inject(CookieService)
  private authService = inject(AuthService)
  private router = inject(Router)

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ loginData }) => {
        const { email, password } = loginData
        return this.authService.login(email, password).pipe(
          map(({ accessToken, user }) => {
            this.cookieService.set('token', accessToken, 1, '/')
            this.router.navigate(['/'])
            return UserApiActions.getUserSuccess({ user })
          }),
          catchError(() => {
            return of(AuthApiActions.loginFailure())
          })
        )
      })
    )
  })

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ registerData }) => {
        const { firstName, lastName, phoneNumber, email, password } = registerData
        return this.authService.register(firstName, lastName, phoneNumber, email, password).pipe(
          map(() => {
            this.router.navigate(['/auth/login'])
            return AuthApiActions.registerSuccess()
          }),
          catchError(() => {
            return of(AuthApiActions.registerFailure())
          })
        )
      })
    )
  })
}
