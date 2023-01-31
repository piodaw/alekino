import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { HomeComponent } from 'src/app/features/home/home.component';
import { HomePageComponent } from './subpages/home-page/home-page.component';
import { MovieReducer, ShowingsReducer } from 'src/app/features/home/store/home.reducer'
import { HomeEffects } from 'src/app/features/home/store/home.effects'

@NgModule({
  imports: [
    StoreModule.forFeature('movies', MovieReducer),
    StoreModule.forFeature('showings', ShowingsReducer),
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
    ]),
  ],
})
export default class HomeModule {}
