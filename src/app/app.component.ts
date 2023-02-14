import { Component, inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-spinner></app-spinner>
    <router-outlet></router-outlet>
  `,
  providers: [],
})
export class AppComponent {
  private cookieStore = inject(CookieService);
  private translate = inject(TranslateService);

  ngOnInit() {
    this.translate.setDefaultLang(this.cookieStore.get('lang') || 'pl');
  }
}
