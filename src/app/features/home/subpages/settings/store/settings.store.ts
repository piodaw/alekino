import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { map, Observable, switchMap, tap } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'

import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { SettingsService } from '../../../shared/services/settings.service'
import { Store } from '@ngrx/store'
import { UserActions } from '@core/store/user.actions'
import { UserData } from '../settings.interfaces'
import { ToastFacadeService } from '@shared/services/toast.facade.service'

export interface SettingsState {
  page: number;
  newsletter: boolean;
}

@Injectable()
export class SettingsStore extends ComponentStore<SettingsState> {
  private reservationService = inject(ReservationService)
  private settingsService = inject(SettingsService)
  private toastService = inject(ToastFacadeService)
  private store = inject(Store)
  private cookieService = inject(CookieService)
  private router = inject(Router)

  constructor() {
    super({
      page: 0,
      newsletter: false,
    });
  }

  readonly setCurrentPage = this.effect((page$: Observable<number>) => {
    return page$.pipe(
      tap(page => {
        this.setPage(page)
      })
    )
  })

  readonly setPage = this.updater((state, page: number): SettingsState => ({
    ...state,
    page,
  }))

  readonly checkIfUserHasNewsletter = this.effect((email$: Observable<string>) => {
    return email$.pipe(
      switchMap(email => this.reservationService.checkIfUserEmailIsInNewsletter(email)),
      map(data => {
        this.patchState({
          newsletter: data.newsletter
        })
      })
    )
  })

  readonly updateUserData = this.effect((data$: Observable<Partial<UserData>>) => {
    return data$.pipe(
      switchMap((data) => this.settingsService.updateUserData(data).pipe(
        tapResponse(
          (res) => {
            console.log(res.message)
            this.toastService.showSuccess(res.message, 'Sukces')
            this.store.dispatch(UserActions.getUser())
          },
          (error: any) => {
            this.toastService.showError(error.error.message, 'Błąd')
          }
        )
      ))
    )
  })
}