import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header [open]="drawerOpen" (openChange)="drawerOpen = $event"></app-header>
    <app-side-nav [open]="drawerOpen" (openChange)="drawerOpen = $event"></app-side-nav>
    <router-outlet></router-outlet>
  `,
  providers: [],
})
export class AppComponent {
  drawerOpen = false;
}
