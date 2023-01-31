import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthEffects } from 'src/app/features/auth/store/auth.effects'

import { AuthComponent } from 'src/app/features/auth/auth.component';
import { LoginComponent } from 'src/app/features/auth/subpages/login/login.component'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  imports: [
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'register',
            component: LoginComponent
          }
        ]
      },
    ]),
  ],
})
export default class AuthModule {}
