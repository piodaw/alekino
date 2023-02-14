import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'

import {
  CreatePromoCodeData,
  ErrorResponse,
  PromoCode,
  UpdatePromoCodeData
} from 'src/app/features/admin/shared/admin.interfaces'
import { AdminPromoCodesService } from 'src/app/features/admin/services/admin-promo-codes.service'
import { Observable, switchMap, tap } from 'rxjs'
import { ToastFacadeService } from '@shared/services/toast.facade.service'

export interface AdminPromoCodesState {
  promoCodes: PromoCode[];
  promoCode: PromoCode;
}

@Injectable()
export class AdminPromoCodesStore extends ComponentStore<AdminPromoCodesState> {
  private adminPromoCodesService = inject(AdminPromoCodesService)
  private toastService = inject(ToastFacadeService)

  constructor() {
    super({
      promoCodes: [],
      promoCode: {
        id: 0,
        promo_code: '',
        value: 0,
      }
    });
  }

  readonly getPromoCodes = this.effect(() => {
    return this.adminPromoCodesService.getPromoCodes().pipe(
      tap(({ promoCodes }) => this.patchState({ promoCodes })),
    )
  })

  readonly getPromoCode = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => {
        return this.adminPromoCodesService.getPromoCode(id).pipe(
          tap((promoCode) => this.patchState({ promoCode })),
        )
      }),
    )
  })

  readonly createPromoCode = this.effect((data$: Observable<CreatePromoCodeData>) => {
    return data$.pipe(
      switchMap((data) => {
        return this.adminPromoCodesService.createPromoCode(data).pipe(
          tapResponse(
            ({ promoCodes }) => {
              this.toastService.showSuccess('Pomyślnie dodano kod promocyjny', 'Kod promocyjny')
              this.patchState({ promoCodes })
            },
            () => this.toastService.showError('Nie udało się dodać kodu promocyjnego', 'Kod promocyjny'),
          ),
        )
      }),
      )
  })

  readonly deletePromoCode = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => {
        return this.adminPromoCodesService.deletePromoCode(id).pipe(
          tapResponse(
            ({ promoCodes }) => {
              this.toastService.showSuccess('Pomyślnie usunięto kod promocyjny', 'Kod promocyjny')
              this.patchState({ promoCodes })
            },
            () => this.toastService.showError('Nie udało się usunąć kodu promocyjnego', 'Kod promocyjny'),
          ),
        )
      }),
      )
  })

  readonly updatePromoCode = this.effect((data$: Observable<UpdatePromoCodeData>) => {
    return data$.pipe(
      switchMap((data) => {
        return this.adminPromoCodesService.updatePromoCode(data).pipe(
          tapResponse(
            ({ promoCodes }) => {
              this.toastService.showSuccess('Pomyślnie zaktualizowano kod promocyjny', 'Kod promocyjny')
              this.patchState({ promoCodes })
            },
          (error: ErrorResponse) => this.toastService.showError(error.error.message, 'Kod promocyjny'),
          ),
        )
      }),
    )
  })
}