export interface IGenreResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  genres: { id: number; name: string }[];
  id: string;
  original_language: string;
  original_name: string;
  name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
