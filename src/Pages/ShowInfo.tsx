import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { discoverMovieGenre, movieById } from "../apis/fetchMovies";
import { discoverTvGenre, seriesById } from "../apis/fetchSeries";
import { MY_LIST, PLAY_BUTTON } from "../constants/bannerButtons";
import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { Genre } from "../components/Genre";

const ShowInfo = () => {
  const location = useLocation();
  const id = location.state.id;
  const showGenres = location.state.movieGenres;
  const type = location.state.type;

  const [selectedShowData, setSelectedShowData] = useState<IGenreResponse>();

  useEffect(() => {
    const getSelectedShow = async () => {
      if (type === "movie") {
        const movies = await movieById(id);
        setSelectedShowData(movies.results);
      }
      if (type === "series") {
        const series = await seriesById(id);
        setSelectedShowData(series.results);
      }
    };
    getSelectedShow();
  }, [id]);

  const relatedMovies = async () => {
    const promises = showGenres.map((item: string) => {
      return discoverMovieGenre(item);
    });

    const responses: any[] = await Promise.all(promises);
    const results: IGenreResponse[] = responses.flatMap(
      (response) => response.results
    );

    return { results, type: "movie" };
  };

  const relatedSeries = async () => {
    const promises = showGenres.map((item: string) => {
      return discoverTvGenre(item);
    });

    const responses: any[] = await Promise.all(promises);
    const results: IGenreResponse[] = responses.flatMap(
      (response) => response.results
    );

    return { results, type: "series" };
  };

  return (
    <div>
      <div
        className=" bg-no-repeat bg-secondary bg-top-right"
        style={{
          backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 255, 0)
        ), url("${BASE_URL}${
            selectedShowData?.backdrop_path || selectedShowData?.poster_path
          }")`,
        }}
      >
        <div className="pl-12 pt-44">
          <h1 className="text-48 text-white font-extrabold mb-4">
            {selectedShowData?.name ||
              selectedShowData?.title ||
              selectedShowData?.original_name}
          </h1>
          <div className="flex">
            <button className=" flex justify-center items-center cursor-pointer text-white border-none outline-none rounded font-bold w-32 px-8 py-1.5 mr-4 bg-grey-dark/50 hover:text-black hover:bg-grey-light hover:transition-all hover:duration-200">
              <BsFillPlayFill className="my-1 mr-2" size={20} />
              {PLAY_BUTTON}
            </button>
            <button className="cursor-pointer flex justify-center items-center text-white border-none outline-none rounded font-bold w-36 p-4 py-1.5 mr-4 bg-grey-dark/50 hover:text-black hover:bg-grey-light hover:transition-all hover:duration-200">
              <HiPlus className="my-1 mr-2" style={{ strokeWidth: 2 }} />
              {MY_LIST}
            </button>
          </div>
          <h1 className="text-base text-white pt-4 max-w-md h-22">
            {selectedShowData?.overview}
          </h1>
        </div>
        <div className="mt-10 ml-4 bg-gradient-primary ">
          <Genre
            title="Related"
            fetchGenre={type === "movie" ? relatedMovies : relatedSeries}
            isGenreRowLarge={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowInfo;
