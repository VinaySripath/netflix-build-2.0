import { instance as request } from "./index";
import { IGenreResponse } from "../types/genreResponse";
import {
  ACTION_GENRE_ID,
  COMEDY_GENRE_ID,
  DOCUMENTARY_GENRE_ID,
  HORROR_GENRE_ID,
  ROMANCE_GENRE_ID,
} from "../constants/genreId";

type discover = (
  genreId?: string
) => Promise<{ results: IGenreResponse[]; type: string }>;

export const discoverMovieGenre: discover = async (genreId?: string) => {
  const response = await request.get(`/discover/movie`, {
    params: {
      with_genres: genreId,
    },
  });
  return { results: response.data.results, type: "movie" };
};

export const romanceMovies = async () => {
  return await discoverMovieGenre(ROMANCE_GENRE_ID);
};

export const actionMovies = async () => {
  return await discoverMovieGenre(ACTION_GENRE_ID);
};

export const comedyMovies = async () => {
  return await discoverMovieGenre(COMEDY_GENRE_ID);
};

export const documentaryMovies = async () => {
  return await discoverMovieGenre(DOCUMENTARY_GENRE_ID);
};

export const horrorMovies = async () => {
  return await discoverMovieGenre(HORROR_GENRE_ID);
};

export const netflixOriginals = async () => {
  const response = await request.get(`/discover/tv`, {
    params: {
      networks: "Netflix",
    },
  });
  return { results: response.data.results, type: "series" };
};

export const trendingMovies = async () => {
  const response = await request.get(`/trending/all/week`, {
    params: {
      language: "en-US",
    },
  });
  return { results: response.data.results, type: "movie" };
};

export const topRated = async () => {
  const response = await request.get(`/movie/top_rated`, {
    params: {
      language: "en-US",
    },
  });
  return { results: response.data.results, type: "movie" };
};

export const movieById = async (id: number) => {
  const response = await request.get(`/movie/${id}`);
  return { results: response.data, type: "movie" };
};
