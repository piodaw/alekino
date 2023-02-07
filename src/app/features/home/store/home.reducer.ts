import { createReducer, on } from '@ngrx/store'

import {
  initialMovieState, initialPromoCodeState,
  initialShowingByIdState,
  initialShowingMoviesState, initialTicketsState
} from 'src/app/features/home/store/home.state'
import { MovieApiActions, ReservationApiActions, ShowingsApiActions } from 'src/app/features/home/store/home.actions'
import { MovieResponse, PromoCodeData, ShowingAndMovieData, ShowingData, TicketsData } from '../shared/home.interfaces'

export const MovieReducer = createReducer(
  initialMovieState,
  on(MovieApiActions.getMoviesSuccess, (state, { MovieData }): MovieResponse => (
    { ...state, ...MovieData }
  ))
)

export const ShowingsReducer = createReducer(
  initialShowingMoviesState,
  on(ShowingsApiActions.getShowingsSuccess, (state, { Showing }): ShowingData => (
    { ...state, ...Showing }
  ))
)

export const ShowingsByIdReducer = createReducer(
  initialShowingByIdState,
  on(ShowingsApiActions.getShowingSuccess, (state, { Showing }): ShowingAndMovieData => (
    { ...state, ...Showing }
  ))
)

export const TicketsReducer = createReducer(
  initialTicketsState,
  on(ReservationApiActions.getTicketsSuccess, (state, { tickets }): TicketsData => (
    { ...state, ...tickets }
  ))
)

export const PromoCodeReducer = createReducer(
  initialPromoCodeState,
  on(ReservationApiActions.getPromocodesSuccess, (state, { promoCodes }): PromoCodeData => (
    { ...state, ...promoCodes }
  ))
)