import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from 'src/app/app.component';
import { API_URL, IS_PRODUCTION } from '@core/env.token';
import { environment } from '../environment';
import { RouterModule } from '@angular/router';
import { noProductionGuard } from '@shared/no-production.guard';
import { CookieService } from 'ngx-cookie-service'
import { UserState } from '@core/store/user.interfaces'
import { UserEffects } from '@core/store/user.effects'
import { userReducer } from '@core/store/user.reducer'
import { HeaderComponent } from '@shared/ui/header/header'
import { TokenInterceptorProvider } from '@shared/interceptors/token.interceptor'
import { SideNavComponent } from '@shared/ui/side-nav/side-nav.component'

export interface AppState {
  user: UserState;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer
    }),
    EffectsModule.forRoot([UserEffects]),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/features/home/home.module')
          },
          {
            path: 'auth',
            loadChildren: () => import('src/app/features/auth/auth.module')
          },
          {
            path: 'theme',
            canMatch: [noProductionGuard],
            loadComponent: () => import('@core/theme.component')
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      }
    ]),
    HeaderComponent,
    SideNavComponent
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: IS_PRODUCTION,
      useValue: environment.production,
    },
    CookieService,
    TokenInterceptorProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
