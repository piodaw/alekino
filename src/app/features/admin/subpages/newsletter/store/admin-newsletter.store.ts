import { inject, Injectable } from '@angular/core'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'

import { Newsletter, UpdateNewsletterData } from 'src/app/features/admin/shared/admin.interfaces'
import { AdminNewsletterService } from 'src/app/features/admin/services/admin-newsletter.service'
import { ToastFacadeService } from '@shared/services/toast.facade.service'

export interface AdminNewslettersState {
  newsletter: Newsletter[]
  newsletterDetails: Newsletter
}

@Injectable()
export class AdminNewsletterStore extends ComponentStore<AdminNewslettersState> {
  private adminNewsletterService = inject(AdminNewsletterService)
  private toastService = inject(ToastFacadeService)

  constructor() {
    super({
      newsletter: [],
      newsletterDetails: {
        id: 0,
        email: ''
      }
    });
  }

  readonly getNewsletter = this.effect(() => {
    return this.adminNewsletterService.getNewsletter().pipe(
      tap(({ newsletter })=> this.patchState({ newsletter }))
    )
  })

  readonly getNewsletterById = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => this.adminNewsletterService.getNewsletterById(id).pipe(
        tapResponse(
          ({ newsletter }) => {
            this.patchState({
              newsletterDetails: newsletter
            })
          },
          () => this.toastService.showError('Nie udało się pobrać newslettera!', 'Błąd')
        )
      ))
    )
  })

  readonly updateNewsletter = this.effect((id$: Observable<UpdateNewsletterData>) => {
    return id$.pipe(
      switchMap(({ id, email }) => this.adminNewsletterService.updateNewsletter(id, email).pipe(
        tapResponse(
          () => {
            this.patchState(({ newsletter }) => ({
              newsletter: newsletter.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    email
                  }
                }
                return item
              })
            }))
          },
          () => this.toastService.showError('Nie udało się zaktualizować newslettera!', 'Błąd!')
        )
      ))
    )
  })

  readonly removeNewsletter = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      switchMap((id) => this.adminNewsletterService.removeNewsletter(id).pipe(
        tapResponse(
          () => {
            this.patchState(({ newsletter }) => ({
              newsletter: newsletter.filter((item) => item.id !== id)
            }))
          },
          () => this.toastService.showError('Nie udało się usunąć newslettera!', 'Błąd!')
        )
      ))
    )
  })
}