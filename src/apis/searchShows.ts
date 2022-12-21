import { instance as request } from "./index";

export const searchMovieResult = async (searchKey: string) => {
  const response = await request.get(`/search/movie`, {
    params: {
      query: searchKey,
    },
  });
  return { results: response.data.results, type: "movies" };
};

export const searchSeriesResult = async (searchKey: string) => {
  const response = await request.get(`/search/tv`, {
    params: {
      query: searchKey,
    },
  });
  return { results: response.data.results, type: "series" };
};
