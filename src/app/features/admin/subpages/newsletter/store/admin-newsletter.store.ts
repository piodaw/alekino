import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { tap } from 'rxjs'

import { Newsletter } from 'src/app/features/admin/shared/admin.interceptors'
import { AdminNewsletterService } from 'src/app/features/admin/services/admin-newsletter.service'

export interface AdminNewslettersState {
  newsletter: Newsletter[]
}

@Injectable()
export class AdminNewsletterStore extends ComponentStore<AdminNewslettersState> {
  private adminNewsletterService = inject(AdminNewsletterService)

  constructor() {
    super({
      newsletter: []
    });
  }

  readonly getNewsletter = this.effect(() => {
    return this.adminNewsletterService.getNewsletter().pipe(
      tap(({ newsletter })=> this.patchState({ newsletter }))
    )
  })
}