import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <ng-scrollbar style="height: 100vh" class="my-scrollbar">
      <app-header></app-header>
      <app-spinner></app-spinner>
      <router-outlet></router-outlet>
    </ng-scrollbar>
  `,
  providers: [],
})
export class AppComponent {}
