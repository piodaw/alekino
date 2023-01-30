import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/features/auth/auth.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
  ],
})
export default class AuthModule {}