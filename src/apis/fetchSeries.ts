import { IGenreResponse } from "../types/genreResponse";
import { instance as request } from "./index";
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

export const discoverTvGenre: discover = async (genreId?: string) => {
  const response = await request.get("/discover/tv", {
    params: {
      with_genres: genreId,
    },
  });
  return { results: response.data.results, type: "series" };
};

export const romanceSeries = async () => {
  return await discoverTvGenre(ROMANCE_GENRE_ID);
};

export const actionSeries = async () => {
  return await discoverTvGenre(ACTION_GENRE_ID);
};

export const comedySeries = async () => {
  return await discoverTvGenre(COMEDY_GENRE_ID);
};

export const documentarySeries = async () => {
  return await discoverTvGenre(DOCUMENTARY_GENRE_ID);
};

export const horrorSeries = async () => {
  return await discoverTvGenre(HORROR_GENRE_ID);
};

export const netflixOriginals = async () => {
  const response = await request.get("/discover/tv", {
    params: {
      with_networks: "Netflix",
    },
  });
  return { results: response.data.results, type: "series" };
};

export const topRatedSeries = async () => {
  const response = await request.get("/tv/top_rated");
  return { results: response.data.results, type: "series" };
};

export const popularSeries = async () => {
  const response = await request.get("/tv/popular");
  return { results: response.data.results, type: "series" };
};

export const seriesById = async (id: number) => {
  const response = await request.get(`/tv/${id}`);
  return { results: response.data, type: "series" };
};
