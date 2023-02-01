import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { HomeComponent } from 'src/app/features/home/home.component';
import { HomePageComponent } from './subpages/home-page/home-page.component';
import {
  MovieReducer,
  ShowingsByIdReducer,
  ShowingsReducer,
  TicketsReducer
} from 'src/app/features/home/store/home.reducer'
import { HomeEffects } from 'src/app/features/home/store/home.effects'
import { ReservationsComponent } from './subpages/reservations/reservations.component';

@NgModule({
  imports: [
    StoreModule.forFeature('movies', MovieReducer),
    StoreModule.forFeature('showings', ShowingsReducer),
    StoreModule.forFeature('showingsById', ShowingsByIdReducer),
    StoreModule.forFeature('tickets', TicketsReducer),
    EffectsModule.forFeature([HomeEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: HomePageComponent,
            pathMatch: 'full',
          }
        ],
      },
      {
        path: 'reservation/:id',
        component: ReservationsComponent
      }
    ]),
  ],
})
export default class HomeModule {}
