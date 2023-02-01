import { createReducer, on } from '@ngrx/store'

import {
  initialMovieState,
  initialShowingByIdState,
  initialShowingMoviesState,
} from 'src/app/features/home/store/home.state'
import { MovieApiActions, ShowingsApiActions } from 'src/app/features/home/store/home.actions'
import { MovieResponse, ShowingAndMovieData, ShowingData } from '../shared/home.interfaces'

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