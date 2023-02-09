import { createFeatureSelector, createSelector } from '@ngrx/store'

import {
  MovieResponse, PromoCodeData,
  ShowingById,
  ShowingData,
  TicketsData
} from 'src/app/features/home/shared/home.interfaces'

const selectMoviesState = createFeatureSelector<MovieResponse>('movies')
const selectShowingsState = createFeatureSelector<ShowingData>('showings')
const selectShowingAndMovieState = createFeatureSelector<ShowingById>('showingsById')
const selectTicketsState = createFeatureSelector<TicketsData>('tickets')
const selectPromoCodesState = createFeatureSelector<PromoCodeData>('promoCodes')

export const selectMovies = createSelector(selectMoviesState, (state) => state)

export const selectShowings = createSelector(selectShowingsState, (state) => state)

export const selectShowingAndMovie = createSelector(selectShowingAndMovieState, (state) => state)

export const selectTickets = createSelector(selectTicketsState, (state) => state.tickets)

export const selectPromoCodes = createSelector(selectPromoCodesState, (state) => state.promoCodes)