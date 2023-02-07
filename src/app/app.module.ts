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
import { CookieService } from 'ngx-cookie-service'
import { UserState } from '@core/store/user.interfaces'
import { UserEffects } from '@core/store/user.effects'
import { userReducer } from '@core/store/user.reducer'
import { HeaderComponent } from '@shared/ui/header/header.component'
import { TokenInterceptorProvider } from '@shared/interceptors/token.interceptor'
import { AuthGuard } from '@shared/guards/loginGuard'
import { AdminGuard } from '@shared/guards/AdminGuard'

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
            path: 'admin',
            canActivate: [AdminGuard],
            loadChildren: () => import('src/app/features/admin/admin.module')
          },
          {
            path: 'auth',
            canActivate: [AuthGuard],
            loadChildren: () => import('src/app/features/auth/auth.module')
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
      }
    ]),
    HeaderComponent
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
