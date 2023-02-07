import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects'

import { AuthEffects } from 'src/app/features/auth/store/auth.effects'
import { AuthComponent } from 'src/app/features/auth/auth.component';
import { LoginComponent } from 'src/app/features/auth/subpages/login/login.component'
import { RegisterComponent } from 'src/app/features/auth/subpages/register/register.component'

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
            component: RegisterComponent
          }
        ]
      },
    ]),
  ],
})
export default class AuthModule {}
