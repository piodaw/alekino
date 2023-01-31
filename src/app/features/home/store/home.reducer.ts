import { createReducer, on } from '@ngrx/store'

import {
  initialMovieState,
  initialShowingMoviesState,
  initialShowingsState
} from 'src/app/features/home/store/home.state'
import { MovieApiActions, ShowingsApiActions } from 'src/app/features/home/store/home.actions'

export const MovieReducer = createReducer(
  initialMovieState,
  on(MovieApiActions.getMoviesSuccess, (state, { MovieData }) => (
    { ...state, ...MovieData }
  ))
)

export const ShowingsReducer = createReducer(
  initialShowingMoviesState,
  on(ShowingsApiActions.getShowingsSuccess, (state, { Showing }) => (
    { ...state, ...Showing }
  ))
)