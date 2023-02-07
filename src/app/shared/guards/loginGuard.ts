import { inject, Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import { Routing } from '@shared/routes/routing'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private cookieService = inject(CookieService)
  private router = inject(Router)

  canActivate() {
    if (!this.cookieService.check('token')) {
      return true
    } else {
      this.router.navigate([Routing.HOME]).then(
        () =>  window.location.reload()
      )
      return false
    }
  }
}
