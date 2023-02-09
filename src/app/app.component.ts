import { Component, inject } from '@angular/core'
import { LoadingService } from '@shared/services/loader.service'

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <mat-progress-spinner color="accent" [mode]="'indeterminate'" *ngIf="loading$ | async"></mat-progress-spinner>
    <router-outlet></router-outlet>
  `,
  styles: [`
    mat-progress-spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 50;
    }
  `],
  providers: [],
})
export class AppComponent {
  private loaderService = inject(LoadingService)

  loading$ = this.loaderService.loading$;
}
