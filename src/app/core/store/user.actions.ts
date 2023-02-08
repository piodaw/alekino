import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { User } from '@core/store/user.interfaces'

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'get user': emptyProps()
  }
})

export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    'get user success': props<{ user: User }>(),
    'get user failure': emptyProps()
  }
})
