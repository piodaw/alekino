import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage, UpperCasePipe } from '@angular/common'
import { Observable } from 'rxjs';

import { WishList } from 'src/app/features/home/shared/home.interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-fav-movie-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    NgOptimizedImage,
    NgForOf,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    UpperCasePipe,
    TranslateModule
  ],
  template: `
    <div class="movie-container">
      <div class="movie-wrapper" *ngFor="let movie of favMovies$ | async">
        <div class="img-wrapper">
          <img [ngSrc]="movie.img" [width]="250" [height]="372" />
        </div>
        <div>
          <h3>{{ movie.title }}</h3>
        </div>
        <div class="button-wrapper">
          <button mat-icon-button [matTooltip]="'Zobacz opis' | uppercase | translate" [mat-menu-trigger-for]="description">
            <mat-icon>comment</mat-icon>
          </button>
          <button mat-icon-button [matTooltip]="'Usuń z ulubionych' | uppercase | translate" (click)="removeHandler(movie.id)">
            <mat-icon>remove_circle</mat-icon>
          </button>
        </div>
        <mat-menu class="description-wrapper" #description yPosition="above" xPosition="before">
          <div class="description">{{ movie.description }}</div>
        </mat-menu>
      </div>
    </div>
  `,
  styles: [
    `
      .movie-container {
        padding: 24px 24px 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        justify-items: center;
      }

      .movie-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 300px;
        height: 500px;
        background-color: var(--surface);
        border-radius: 8px;
        box-shadow: 0 0 10px 0 rgb(255, 143, 198);
      }

      .img-wrapper {
        width: 250px;
        height: 372px;
        border-radius: 8px;
        box-shadow: 0 0 10px 0 rgb(255 143 198 / 30%);
      }

      img {
        border-radius: 8px;
      }

      ::ng-deep .mat-mdc-menu-panel.description-wrapper {
        max-width: 550px !important;
        padding: 12px !important;
      }

      .button-wrapper {
        display: flex;
        gap: 12px;
      }

      .description {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavMovieCardComponent {
  @Input() favMovies$!: Observable<WishList[]>;
  @Output() removeFromWishlist = new EventEmitter<number>();

  removeHandler(id: number) {
    this.removeFromWishlist.emit(id);
  }
}
