export interface ShowingData {
  start: string;
  movie_id: number;
  hall_id: number;
}

export interface MovieResponse {
  count: number;
  movies: Movie[];
}

export interface Movie {
  age: string;
  description: string;
  duration: string;
  genre: string[];
  id: number;
  img: string;
  ispremiere: boolean;
  rating: number;
  shortdescription: string;
  title: string;
}

export interface HallResponse {
  count: number;
  halls: Hall[];
}

export interface HellByIdResponse {
  hall: Hall;
}

export interface HallUpdate {
  hall_id: number;
  rows: number;
  columns: number;
}

export interface Hall {
  id: number;
  hallno: number;
  capacity: number;
  rows: string[];
  columns: string[];
}

export interface ShowingResponse {
  "showings": Showing[];
  "count": number;
}

export interface Showing {
  id: number;
  movieid: number;
  hallid: number;
  hallno: number;
  start: string;
  end: string;
  bookedseats: string[];
  paidseats: string[];
  middlehours: string[];
}

export interface UsersResponseData {
  users: User[];
  count: number;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: number;
}

export interface ReservationResponse {
  reservations: Reservation[];
  count: number;
}

export interface Reservation {
  "seats": string[];
  "ticket_no": number;
  "first_name": string;
  "last_name": string;
  "email": string;
  "phone_number": string;
  "blik_code": string;
  "user_id": number | null;
  "showing_id": number;
  "total_price": number;
  "start": string;
  "hall_id": number;
  "title": string;
}

export interface PromoCodeResponse {
  promoCodes: PromoCode[];
  count: number;
}

export interface PromoCode {
  "promo_id": number;
  "promo_code": string;
  "value": number;
}

export interface MoviesResponse {
  movies: Movie[];
  count: number;
}

export interface NewsletterResponse {
  newsletter: Newsletter[];
  count: number;
}

export interface Newsletter {
  newsletter_id: number;
  email: string;
}
