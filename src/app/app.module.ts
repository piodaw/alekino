import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { AppComponent } from 'src/app/app.component';
import { API_URL, IS_PRODUCTION } from '@core/env.token';
import { environment } from '../environment';
import { UserState } from '@core/store/user.interfaces'
import { UserEffects } from '@core/store/user.effects'
import { userReducer } from '@core/store/user.reducer'
import { HeaderComponent } from '@shared/ui/header/header.component'
import { TokenInterceptorProvider } from '@shared/interceptors/token.interceptor'
import { AuthGuard } from '@shared/guards/loginGuard'
import { AdminGuard } from '@shared/guards/AdminGuard'
import { SpinnerComponent } from '@shared/ui/spinner/spinner.component'
import { UserGuard } from '@shared/guards/UserGuard'
import { LoaderInterceptorProvider } from '@shared/interceptors/loader.interceptor'

export interface AppState {
  user: UserState;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'pl'
    }),
    ToastrModule.forRoot(),
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
            canActivate: [UserGuard],
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
    HeaderComponent,
    SpinnerComponent
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
    TokenInterceptorProvider,
    LoaderInterceptorProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
