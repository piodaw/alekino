import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/ui/footer/footer'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  template: `
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
