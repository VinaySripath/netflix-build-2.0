import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { searchMovieResult, searchSeriesResult } from "../apis/searchShows";
import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.get("key");

  const [searchedMovies, setSearchedMovies] = useState<IGenreResponse[]>();
  const [searchedSeries, setSearchedSeries] = useState<IGenreResponse[]>();
  const typeMovie = "movie";
  const typeSeries = "series";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchData = async () => {
      const searchMovieData = await searchMovieResult(searchKey);
      setSearchedMovies(searchMovieData.results);
    };
    fetchSearchData();
  }, [searchKey]);

  useEffect(() => {
    const fetchSearchData = async () => {
      const searchSeriesData = await searchSeriesResult(searchKey);
      setSearchedSeries(searchSeriesData.results);
    };
    fetchSearchData();
  }, [searchKey]);

  const showInfoHandler = (
    id: string,
    movieGenres: [],
    type: string | undefined
  ) => {
    navigate("/showinfo", {
      state: { id, movieGenres, type },
    });
  };

  return (
    <div className="w-full h-screen bg-black">
      <div className="w-full pt-32 p-8 grid grid-cols-2 desktop:grid-cols-8 laptop:grid-cols-6 tablet:grid-cols-4 gap-4 bg-black ">
        {searchedMovies?.map((movie) => {
          return (
            movie.poster_path && (
              <img
                key={movie.id}
                src={`${BASE_URL}${movie.poster_path}`}
                alt="movie"
                className=" max-w-160 max-h-300 pb-5 pr-4 transition-transform duration-500 hover:scale-120"
                onClick={() =>
                  showInfoHandler(movie.id, movie.genre_ids, typeMovie)
                }
              />
            )
          );
        })}
        {searchedSeries?.map((series) => {
          return (
            series.poster_path && (
              <img
                key={series.id}
                src={`${BASE_URL}${series.poster_path}`}
                alt="movie"
                className=" max-w-160 max-h-300 pb-5 pr-4 transition-transform duration-500 hover:scale-120"
                onClick={() =>
                  showInfoHandler(series.id, series.genre_ids, typeSeries)
                }
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
