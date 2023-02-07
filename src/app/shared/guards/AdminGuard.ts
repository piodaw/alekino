import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { inject, Injectable } from '@angular/core'
import { selectLoggedUser } from '@core/store/user.selectors'
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private store = inject(Store)
  private router = inject(Router)

  loggedUser$ = this.store.select(selectLoggedUser)

  canActivate() {
    return this.loggedUser$.pipe(
      map(user => {
        if (user.role === 1) {
          return true
        } else {
          this.router.navigate(['/']).then(
            () => window.location.reload()
          )
          return false
        }
      })
    )
  }
}