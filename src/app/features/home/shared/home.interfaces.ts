export interface MovieResponse {
  count: number;
  movies: Movie[];
}

export interface Movie {
  age?: string;
  description?: string;
  duration?: string;
  genre?: string[];
  id?: number;
  img?: string;
  ispremiere?: boolean;
  rating?: number;
  shortdescription?: string;
  title?: string;
}

export interface ShowingResponse {
  count: number;
  showings: Showing[];
}

export interface Showing {
  end: string;
  hallid: number;
  id: number;
  movieid: number;
  start: string;
  middlehours: string[];
}

export interface ShowingData {
  showings: ShowingWMovie[];
}

export interface ShowingWMovie extends Movie {
  showings: Showing[]
}