import { Component, inject } from '@angular/core'
import { LoadingService } from '@shared/services/loader.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <mat-progress-spinner color="accent" [mode]="'indeterminate'" *ngIf="loading$ | async"></mat-progress-spinner>
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
  imports: [
    MatProgressSpinnerModule,
    AsyncPipe,
    NgIf
  ]
})
export class SpinnerComponent {
  private loaderService = inject(LoadingService)

  loading$ = this.loaderService.loading$;
}
