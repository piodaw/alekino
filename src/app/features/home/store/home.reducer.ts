import { createReducer, on } from '@ngrx/store'

import {
  initialMovieState, initialPromoCodeState,
  initialShowingByIdState,
  initialShowingMoviesState, initialTicketsState
} from 'src/app/features/home/store/home.state'
import { MovieApiActions, ReservationApiActions, ShowingsApiActions } from 'src/app/features/home/store/home.actions'
import { MovieResponse, PromoCodeData, ShowingById, ShowingData, TicketsData } from '../shared/home.interfaces'

export const MovieReducer = createReducer(
  initialMovieState,
  on(MovieApiActions.getMoviesSuccess, (state, { MovieData }): MovieResponse => (
    { ...state, ...MovieData }
  )),

  on(MovieApiActions.rateMovieSuccess, (state, { movie_id, rating }): MovieResponse => {
    const movie = state.movies.find((movie) => movie.id === movie_id)
    const newMovie = { ...movie, rating: rating }
    const newMovies = state.movies.map((movie) => movie.id === movie_id ? newMovie : movie)
    return { ...state, movies: newMovies }
  })
)

export const ShowingsReducer = createReducer(
  initialShowingMoviesState,
  on(ShowingsApiActions.getShowingsSuccess, (state, { Showing }): ShowingData => (
    { ...state, ...Showing }
  )),

  on(MovieApiActions.rateMovieSuccess, (state, { movie_id, rating }): ShowingData => {
    const showing = state.showings.find((showing) => showing.id === movie_id)
    if (!showing) return state
    const newShowing = { ...showing, rating: rating }
    const newShowings = state.showings.map((showing) => showing.id === movie_id ? newShowing : showing)
    return { ...state, showings: newShowings }
  })
)

export const ShowingsByIdReducer = createReducer(
  initialShowingByIdState,
  on(ShowingsApiActions.getShowingSuccess, (state, { Showing }): ShowingById => {
    return { ...state, ...Showing }
  })
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