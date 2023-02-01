import { ChangeDetectionStrategy, Component } from '@angular/core'

import { MatIconModule } from '@angular/material/icon'
import { Links } from '@shared/ui/footer/constants/links'
import { RouterLink } from '@angular/router'
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer-wrapper">
      <div class="footer-items">
        <div class="footer-icons">
          <div>
            <mat-icon>facebook</mat-icon>
          </div>
          <div>
            <mat-icon>camera</mat-icon>
          </div>
          <div>
            <mat-icon>play_circle_filled</mat-icon>
          </div>
        </div>
        <div class="nav-wrapper">
          <a *ngFor="let route of routes" [routerLink]="route.Link">
            {{ route.title }}
          </a>
        </div>
      </div>
      <div class="footer-copyright">&copy; 2023 Cinvelo</div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      margin-top: 24px;
      width: 100%;
      height: 100px;
      background-color: var(--primaryDark);
    }

    .footer-items {
      display: flex;
      justify-content: space-between;
      height: 70%;
      align-items: center;
      padding: 0 20px;
    }

    .footer-icons {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: center;
    }

    .nav-wrapper {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 0 32px;
    }

    a {
      text-decoration: none;
      color: var(--text-primary);
    }

    .footer-copyright {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 30%;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    RouterLink,
    NgForOf

  ]
})

export class FooterComponent {

  routes = Links
}