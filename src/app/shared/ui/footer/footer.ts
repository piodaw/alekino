import { ChangeDetectionStrategy, Component } from '@angular/core'

import { MatIconModule } from '@angular/material/icon'
import { Links } from '@shared/ui/footer/constants/links'
import { RouterLink } from '@angular/router'
import { NgForOf, UpperCasePipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

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
            {{ route.title | uppercase | translate }}
          </a>
        </div>
      </div>
      <div class="footer-copyright">&copy; 2023 Cinvelo</div>
    </footer>
  `,
  styleUrls: ['./footer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    RouterLink,
    NgForOf,
    UpperCasePipe,
    TranslateModule

  ]
})

export class FooterComponent {

  routes = Links
}