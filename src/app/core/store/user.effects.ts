import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CookieService } from 'ngx-cookie-service'
import { catchError, filter, map, of, startWith, switchMap } from 'rxjs'
import { Router } from '@angular/router'

import { UserActions, UserApiActions } from '@core/store/user.actions'
import { UserService } from '@core/store/user.service'

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private cookieService = inject(CookieService);
  private userService = inject(UserService);
  private router = inject(Router);

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUser),
      startWith(UserActions.getUser),
      filter(() => this.cookieService.check('token')),
      switchMap(() => {
        return this.userService.getMe().pipe(
          map(response => UserApiActions.getUserSuccess({ user: response })));
      }),
      catchError(() => {
        // this.router.navigate([APP_PATH.AUTH]);
        // this.toastService.showError('Nie udało się pobrać użytkownika', 'Błąd');
        this.cookieService.delete('token');
        return of(UserApiActions.getUserFailure());
      })
    );
  });
}