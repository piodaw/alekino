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
  hallno: number;
  id: number;
  movieid: number;
  start: string;
  middlehours: string[];
}

export interface ShowingData {
  showings: ShowingWMovie[];
}

export interface ShowingWMovie extends Movie {
  showings: Showing[];
}

export interface ShowingAndMovieData {
  showing: ShowingById;
}

export interface ShowingById {
  id: number;
  start: string;
  bookedseats?: string[];
  paidseats: string[];
  movieid: number;
  title: string;
  duration: string;
  hallid: number;
  hallno: number;
  columns: string[];
  rows: string[];
}

export interface TicketsData {
  tickets: Ticket[];
}

export interface Ticket {
  ticket_type_id: number;
  name: string;
  price: number;
  description: string | null;
}

export interface addToWishlist {
  movie_id: number;
  user_id: number;
}

export interface PromoCodeData {
  promoCodes: PromoCode[];
}

export interface PromoCode {
  promo_id: number;
  promo_code: string;
  value: number;
}

export interface WishListResponse {
  wishlist: WishList[];
}

export interface WishList {
  id: number;
  movie_id: number;
  user_id: number;
  title: string;
  img: string;
  description: string;
}
