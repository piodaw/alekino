import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-auth',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet
  ]
})
export class AuthComponent {}
