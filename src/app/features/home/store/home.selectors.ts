import { createFeatureSelector, createSelector } from '@ngrx/store'

import { MovieResponse, ShowingData } from 'src/app/features/home/shared/home.interfaces'

const selectMoviesState = createFeatureSelector<MovieResponse>('movies')
const selectShowingsState = createFeatureSelector<ShowingData>('showings')

export const selectMovies = createSelector(selectMoviesState, (state) => state)

export const selectShowings = createSelector(selectShowingsState, (state) => state)