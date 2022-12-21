import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { searchMovieResult, searchSeriesResult } from "../apis/searchShows";
import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";

function Search() {
  const location = useLocation();
  const searchKey = location.state;
  const [searchedMovies, setSearchedMovies] = useState<IGenreResponse[]>();
  const [searchedSeries, setSearchedSeries] = useState<IGenreResponse[]>();
  const typeMovie = "movie";
  const typeSeries = "series";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchData = async () => {
      const searchMovieData = await searchMovieResult(searchKey);
      const searchSeriesData = await searchSeriesResult(searchKey);
      setSearchedMovies(searchMovieData.results);
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
      <div className="w-full pt-32 p-8 grid desktop:grid-cols-8 laptop:grid-cols-6 tablet:grid-cols-4 mobile:grid-cols-2 gap-4 bg-black ">
        {searchedMovies?.map((movie) => {
          if (movie.poster_path) {
            return (
              <img
                key={movie.id}
                src={`${BASE_URL}${movie.poster_path}`}
                alt="movie"
                className=" max-w-160 max-h-300 pb-5 pr-4 transition-transform duration-500 hover:scale-120"
                onClick={() =>
                  showInfoHandler(movie.id, movie.genre_ids, typeMovie)
                }
              />
            );
          } else {
            return null;
          }
        })}
        {searchedSeries?.map((series) => {
          if (series.poster_path) {
            return (
              <img
                key={series.id}
                src={`${BASE_URL}${series.poster_path}`}
                alt="movie"
                className=" max-w-160 max-h-300 pb-5 pr-4 transition-transform duration-500 hover:scale-120"
                onClick={() =>
                  showInfoHandler(series.id, series.genre_ids, typeSeries)
                }
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Search;
