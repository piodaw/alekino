import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { map, Observable, switchMap, tap, timer } from 'rxjs'
import { ReservationService } from 'src/app/features/home/shared/services/reservation.service'
import { CookieService } from 'ngx-cookie-service'
import { addMinutes } from 'date-fns'
import { Router } from '@angular/router'
import { Routing } from '@shared/routes/routing'

export interface SettingsState {
  page: number;
  newsletter: boolean;
}

@Injectable()
export class SettingsStore extends ComponentStore<SettingsState> {
  private reservationService = inject(ReservationService)
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

  readonly setPage = this.updater((state, page: number) => ({
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
}