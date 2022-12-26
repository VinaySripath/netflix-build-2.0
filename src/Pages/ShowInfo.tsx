import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { discoverMovieGenre, movieById, topRated } from "../apis/fetchMovies";
import {
  discoverTvGenre,
  seriesById,
  topRatedSeries,
} from "../apis/fetchSeries";
import { MY_LIST, PLAY_BUTTON } from "../constants/bannerButtons";
import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";
import { BsFillPlayFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { Genre } from "../components/Genre";
import { discover } from "../types/discover";

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
    // eslint-disable-next-line
  }, [id]);

  const related = async (
    fetchRelated: discover,
    fetchDefault: () => Promise<{ results: IGenreResponse[]; type: string }>,
    typeOfRelatedShows: string
  ) => {
    const promises = showGenres.map((item: string) => {
      return fetchRelated(item);
    });

    const responses: any[] = await Promise.all(promises);
    let results: IGenreResponse[] = responses.flatMap(
      (response) => response.results
    );

    if (results.length === 0) {
      const defaultResponse = await fetchDefault();
      results = defaultResponse.results;
    }

    return { results, type: `${typeOfRelatedShows}` };
  };

  const relatedMovies = async () => {
    return await related(discoverMovieGenre, topRated, "movie");
  };
  const relatedSeries = async () => {
    return await related(discoverTvGenre, topRatedSeries, "series");
  };

  return (
    <div>
      <div
        className=" bg-no-repeat bg-poster-small laptop:bg-secondary bg-top-right min-h-screen flex flex-col justify-around"
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
        <div className="pl-8 tablet:pl-12 pt-44">
          <h1 className="text-24 laptop:text-48 text-white font-extrabold mb-2 laptop:mb-4">
            {selectedShowData?.name ||
              selectedShowData?.title ||
              selectedShowData?.original_name}
          </h1>
          <div className="flex">
            <button className=" flex justify-center items-center cursor-pointer text-white border-none outline-none rounded font-bold w-24 tablet:w-32 px-2 tablet:px-8 py-1.5 mr-4 bg-red-500/80 tablet:bg-grey-dark/50 laptop:hover:text-black laptop:hover:bg-grey-light laptop:hover:transition-all laptop:hover:duration-200">
              <BsFillPlayFill className="laptop:my-1 mr-2" size={20} />
              {PLAY_BUTTON}
            </button>
            <button className="cursor-pointer flex justify-center items-center text-white border-none outline-none rounded font-bold w-32 tablet:w-36 px-2 tablet:px-4 py-1.5 mr-4 bg-grey-dark/50 laptop:hover:text-black laptop:hover:bg-grey-light laptop:hover:transition-all laptop:hover:duration-200">
              <HiPlus className="my-1 mr-2" style={{ strokeWidth: 2 }} />
              {MY_LIST}
            </button>
          </div>
          <h1 className="text-12 tablet:text-16 text-white pt-4 max-w-md h-22">
            {selectedShowData?.overview}
          </h1>
        </div>
        <div className="mt-10 laptop:ml-4 bg-gradient-primary bg-top">
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
