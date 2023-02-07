import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

import { PromoCode, Reservation } from 'src/app/features/admin/shared/admin.interceptors'
import { AdminPromoCodesService } from 'src/app/features/admin/services/admin-promo-codes.service'
import { tap } from 'rxjs'

export interface AdminPromoCodesState {
  promoCodes: PromoCode[]
}

@Injectable()
export class AdminPromoCodesStore extends ComponentStore<AdminPromoCodesState> {
  private adminPromoCodesService = inject(AdminPromoCodesService)

  constructor() {
    super({
      promoCodes: []
    });
  }

  readonly getPromoCodes = this.effect(() => {
    return this.adminPromoCodesService.getPromoCodes().pipe(
      tap(({ promoCodes }) => this.setPromoCodes(promoCodes))
    )
  })

  readonly setPromoCodes = this.updater((state, promoCodes: PromoCode[]) => {
    return {
      ...state,
      promoCodes
    }
  })
}