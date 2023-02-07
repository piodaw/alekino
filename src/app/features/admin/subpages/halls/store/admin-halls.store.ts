import { inject, Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable, switchMap, tap } from 'rxjs'

import { Hall, HallUpdate } from 'src/app/features/admin/shared/admin.interceptors'
import { AdminHallsService } from 'src/app/features/admin/services/admin-halls.service'

export interface AdminHallsState {
  halls: Hall[];
  hall: Hall;
}

@Injectable()
export class AdminHallsStore extends ComponentStore<AdminHallsState> {
  private adminHallsService = inject(AdminHallsService)

  constructor() {
    super({
      halls: [],
      hall: {
        id: 0,
        hallno: 0,
        rows: [],
        columns: [],
        capacity: 0,
      }
    });
  }

  readonly getHalls = this.effect(() => {
    return this.adminHallsService.getHalls().pipe(
      tap((halls) => this.updateHalls(halls.halls)
      ))
  })

  readonly getHallById = this.effect((hall_id$: Observable<number>) => {
    return hall_id$.pipe(
      switchMap((hall_id) => this.adminHallsService.getHallById(hall_id)),
      tap((hall) => this.updateHall(hall.hall))
    )
  })

  readonly updateHallById = this.effect((hallData$: Observable<HallUpdate>) => {
    return hallData$.pipe(
      switchMap(
        ({
           hall_id,
           rows,
           columns
        }) => this.adminHallsService.updateHall(
          hall_id,
          rows,
          columns
        )),
      tap((hall) => this.updateHalls(hall.halls)
    ))
  })

  readonly updateHalls = this.updater((state, halls: Hall[]) => {
    return {
      ...state,
      halls
    }
  })

  readonly updateHall = this.updater((state, hall: Hall) => {
    return {
      ...state,
      hall
    }
  })

  readonly createHall = this.effect(
    createHall$ => createHall$.pipe(
      switchMap(() => this.adminHallsService.createHall()),
      tap((hall) => this.updateHalls(hall.halls))
    )
  )

  readonly deleteHall = this.effect((hallId$: Observable<number>) => {
    return hallId$.pipe(
      switchMap((hall_id) => this.adminHallsService.deleteHall(hall_id)),
      tap((hall) => this.updateHalls(hall.halls))
    )
  })
}