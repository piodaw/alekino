import { createActionGroup, emptyProps, props } from '@ngrx/store'

import { LoginData, RegisterData } from '../'
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'login': props<{ loginData: LoginData }>(),

    'register': props<{ registerData: RegisterData }>(),
  }
})

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'login failure': emptyProps(),

    'register success': emptyProps(),
    'register failure': emptyProps()
  }
})