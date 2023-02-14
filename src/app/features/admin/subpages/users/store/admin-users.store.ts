import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

import { User } from 'src/app/features/admin/shared/admin.interfaces';
import { AdminUsersService } from 'src/app/features/admin/services/admin-users.service';
import { map } from 'rxjs';

export interface AdminUsersState {
  users: User[];
}

@Injectable()
export class AdminUserStore extends ComponentStore<AdminUsersState> {
  private adminUsersService = inject(AdminUsersService);

  constructor() {
    super({
      users: [],
    });
  }

  readonly getUsers = this.effect(() => {
    return this.adminUsersService.getUsers().pipe(map(data => this.updateUsers(data.users)));
  });

  readonly updateUsers = this.updater((state, users: User[]): AdminUsersState => ({ ...state, users }));
}
