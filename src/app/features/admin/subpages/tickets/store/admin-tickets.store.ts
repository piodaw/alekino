import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { AdminTicketService } from 'src/app/features/admin/services/admin-ticket.service';
import { map } from 'rxjs';
import { Reservation } from 'src/app/features/admin/shared/admin.interfaces';

export interface AdminTicketsState {
  reservations: Reservation[];
}

@Injectable()
export class AdminTicketsStore extends ComponentStore<AdminTicketsState> {
  private AdminTicketsService = inject(AdminTicketService);

  constructor() {
    super({
      reservations: [],
    });
  }

  readonly getReservations = this.effect(() => {
    return this.AdminTicketsService.getTickets().pipe(map(({ reservations }) => this.updateReservations(reservations)));
  });

  readonly updateReservations = this.updater(
    (state, reservations: Reservation[]): AdminTicketsState => ({ ...state, reservations })
  );
}
