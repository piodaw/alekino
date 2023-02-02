import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Observable } from 'rxjs'

import { ShowingData } from 'src/app/features/home/shared/home.interfaces'
import { AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { Routing } from '@shared/routes/routing'
import { RouterLink } from '@angular/router'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { User } from '@core/store/user.interfaces'

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    MatCardModule,
    NgIf,
    NgForOf,
    NgOptimizedImage,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="showing-card-wrapper" *ngIf="showing$ | async as showing">
      <mat-card *ngFor="let show of showing.showings">
        <mat-card-content>
          <div class="img-wrapper">
            <img [ngSrc]="show.img!" [alt]="show.title" width="150" height="200">
          </div>
          <div class="info-wrapper">
            <div class="info">
              <h3>{{ show.title }}</h3>
              <div> 
                <p>{{ show.genre }} | {{ show.duration }} min | {{ show.age }}</p>
              </div>
              <p>{{ show.shortdescription }}</p>
            </div>
            <div class="hours-wrapper">
              <button class="hours" mat-stroked-button color="accent" *ngFor="let hours of show.showings" (click)="redirectToReservationPage(hours.id)">
                <div class="hour-button">
                  <span>{{ hours.start.split(" ")[1] }}</span>
                  <span>Sala: {{ hours.hallno }}</span>
                </div>
              </button>
            </div>
          </div>
          <div class="button-wrapper">
            <p class="rating">{{ show.rating }}/10</p>
            <div>
              <button mat-raised-button color="primary">Oceń</button>
            </div>
            <div *ngIf="loggedIn$ | async as user">
              <button mat-flat-button color="accent" *ngIf="show.id as movie_id" (click)="addToWishList(user.userId, movie_id)">Chcę obejrzeć</button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .showing-card-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    mat-card {
      background-color: var(--surface);
      padding: 18px;
      width: 90vw;
    }

    mat-card-content {
      display: flex;
      justify-content: space-between;
    }

    .img-wrapper {
      box-shadow: 0 0 10px 0 rgba(255, 143, 198, 0.3);
    }

    .info-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 80%;
    }

    .hours-wrapper {
      display: flex;
      align-items: flex-end;
      gap: 4px;
    }

    .hours {
      width: 80px;
      height: 40px;
    }

    .hour-button {
      display: flex;
      flex-direction: column;
    }

    .button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .rating {
      font-size: 24px;
    }

    button {
      width: 130px;
    }

    .mat-mdc-outlined-button:not(:disabled) {
      border-color: var(--secondaryDark);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  @Input() showing$!: Observable<ShowingData>
  @Input() loggedIn$!: Observable<User>
  @Output() movieSelected = new EventEmitter<string>();
  @Output() redirectToReservation = new EventEmitter<string>();
  @Output() wishList = new EventEmitter<{ user_id: number, movie_id: number }>();

  redirectToReservationPage(id: number) {
    this.redirectToReservation.emit(`${Routing.RESERVATION}/${id}`);
  }

  addToWishList(user_id: number, movie_id: number) {
    this.wishList.emit({ user_id, movie_id });
  }
}