import { createFeatureSelector, createSelector } from '@ngrx/store'

import { MovieResponse, ShowingAndMovieData, ShowingData } from 'src/app/features/home/shared/home.interfaces'

const selectMoviesState = createFeatureSelector<MovieResponse>('movies')
const selectShowingsState = createFeatureSelector<ShowingData>('showings')
const selectShowingAndMovieState = createFeatureSelector<ShowingAndMovieData>('showingsById')

export const selectMovies = createSelector(selectMoviesState, (state) => state)

export const selectShowings = createSelector(selectShowingsState, (state) => state)

export const selectShowingAndMovie = createSelector(selectShowingAndMovieState, (state) => state.showing)