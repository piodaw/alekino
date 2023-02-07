import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { HomeComponent } from 'src/app/features/home/home.component';
import { HomePageComponent } from './subpages/home-page/home-page.component';
import {
  MovieReducer, PromoCodeReducer,
  ShowingsByIdReducer,
  ShowingsReducer,
  TicketsReducer
} from 'src/app/features/home/store/home.reducer'
import { HomeEffects } from 'src/app/features/home/store/home.effects'
import { ReservationsComponent } from './subpages/reservations/reservations.component';
import { WishlistComponent } from './subpages/wishlist/wishlist.component';
import { SuccessComponent } from 'src/app/features/home/subpages/success/success.component'
import { MyTicketsComponent } from 'src/app/features/home/subpages/my-tickets/my-tickets.component'
import { SettingsComponent } from 'src/app/features/home/subpages/settings/settings.component'

@NgModule({
  imports: [
    StoreModule.forFeature('movies', MovieReducer),
    StoreModule.forFeature('showings', ShowingsReducer),
    StoreModule.forFeature('showingsById', ShowingsByIdReducer),
    StoreModule.forFeature('tickets', TicketsReducer),
    StoreModule.forFeature('promoCodes', PromoCodeReducer),
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
          },
          {
            path: 'wishlist',
            component: WishlistComponent
          },
          {
            path: 'settings',
            component: SettingsComponent
          }
        ],
      },
      {
        path: 'reservation/:id',
        component: ReservationsComponent
      },
      {
        path: 'success/:id',
        component: SuccessComponent
      },
      {
        path: 'tickets',
        component: MyTicketsComponent
      }
    ]),
  ],
})
export default class HomeModule {}
