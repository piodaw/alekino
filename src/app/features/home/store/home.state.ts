import { Movie, MovieResponse, ShowingData, ShowingResponse } from 'src/app/features/home/shared/home.interfaces'

export const initialMovieState: MovieResponse = {
  count: 0,
  movies: []
}

export const initialShowingsState: ShowingResponse = {
  count: 0,
  showings: []
}

export const initialShowingMoviesState: ShowingData = {
  showings: []
}