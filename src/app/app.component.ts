import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <app-spinner></app-spinner>
    <router-outlet></router-outlet>
  `,
  providers: [],
})
export class AppComponent {}
