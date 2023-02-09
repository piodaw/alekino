import { inject, Injectable } from '@angular/core'
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { LoadingService } from '@shared/services/loader.service'
import { finalize, Observable } from 'rxjs'

@Injectable()
class LoaderInterceptor implements HttpInterceptor {
  private loaderService = inject(LoadingService)

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show()
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    )
  }
}

export const loaderInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoaderInterceptor,
  multi: true,
}