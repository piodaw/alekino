import {
  MovieResponse,
  ShowingAndMovieData,
  ShowingData,
  ShowingResponse,
  TicketsData
} from 'src/app/features/home/shared/home.interfaces'

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

export const initialShowingByIdState: ShowingAndMovieData = {
  showing: {
    id: 0,
    start: '',
    bookedseats: [],
    paidseats: [],
    movieid: 0,
    title: '',
    duration: '',
    hallid: 0,
    hallno: 0,
    columns: [],
    rows: []
  }
}

export const initialTicketsState: TicketsData = {
  tickets: []
}