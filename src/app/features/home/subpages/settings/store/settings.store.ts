import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { map, Observable, switchMap, tap } from 'rxjs'
import { Store } from '@ngrx/store'

import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { SettingsService } from '../../../shared/services/settings.service'
import { UserActions } from '@core/store/user.actions'
import { NewsletterData, UserData } from '../settings.interfaces'
import { ToastFacadeService } from '@shared/services/toast.facade.service'
import { CookieService } from 'ngx-cookie-service'
import { ErrorResponse } from 'src/app/features/admin/shared/admin.interfaces'

export interface SettingsState {
  page: number;
  newsletter: boolean;
}

@Injectable()
export class SettingsStore extends ComponentStore<SettingsState> {
  private reservationService = inject(ReservationService)
  private settingsService = inject(SettingsService)
  private toastService = inject(ToastFacadeService)
  private cookieService = inject(CookieService)
  private store = inject(Store)

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
            this.toastService.showSuccess(res.message, 'Sukces')
            if (res.accessToken) {
              this.cookieService.set('token', res.accessToken, 1, '/')
            }
            this.store.dispatch(UserActions.getUser())
          },
          (error: ErrorResponse) => {
            this.toastService.showError(error.error.message, 'Błąd')
          }
        )
      ))
    )
  })

  readonly updateNewsletter = this.effect((data$: Observable<NewsletterData>) => {
    return data$.pipe(
      switchMap((data) => {
        if (data.newsletter) {
          return this.settingsService.addUserToNewsletter(data.email).pipe(
            tapResponse(
              (res) => {
                this.toastService.showSuccess("Pomyślnie dodano do newslettera", 'Sukces')
                this.patchState({
                  newsletter: true
                })
              },
              (error: ErrorResponse) => {
                this.toastService.showError(error.error.message, 'Błąd')
              }
            )
          )
        } else {
          return this.settingsService.removeUserFromNewsletter(data.email).pipe(
            tapResponse(
              (res) => {
                this.toastService.showSuccess("Pomyślnie usunięto z newslettera", 'Sukces')
                this.patchState({
                  newsletter: false
                })
              },
              (error: ErrorResponse) => {
                this.toastService.showError(error.error.message, 'Błąd')
              }
            )
          )
        }
      })
    )
  })
}