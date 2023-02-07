import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from 'src/app/features/admin/admin.component'
import { AdminRepertoireComponent } from 'src/app/features/admin/subpages/repertoire/admin-repertoire.component'
import { AdminTicketsComponent } from 'src/app/features/admin/subpages/tickets/admin-tickets.component'
import { AdminUsersComponent } from 'src/app/features/admin/subpages/users/admin-users.component'
import { AdminHallsComponent } from 'src/app/features/admin/subpages/halls/admin-halls.component'
import { AdminPromoCodesComponent } from 'src/app/features/admin/subpages/promo-codes/admin-promo-codes.component'
import { AdminMoviesComponent } from 'src/app/features/admin/subpages/movies/admin-movies.component'
import { AdminNewsletterComponent } from 'src/app/features/admin/subpages/newsletter/admin-newsletter.component'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: 'movies',
            component: AdminMoviesComponent,
          },
          {
            path: 'repertoire',
            component: AdminRepertoireComponent,
          },
          {
            path: 'tickets',
            component: AdminTicketsComponent
          },
          {
            path: 'users',
            component: AdminUsersComponent
          },
          {
            path: 'new-movie',
            component: AdminComponent,
          },
          {
            path: 'halls',
            component: AdminHallsComponent
          },
          {
            path: 'update-hall/:id',
            component: AdminComponent,
          },
          {
            path: 'promo-codes',
            component: AdminPromoCodesComponent
          },
          {
            path: 'newsletter',
            component: AdminNewsletterComponent
          }
        ]
      },
    ]),
  ],
})
export default class AdminModule {}
