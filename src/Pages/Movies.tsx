import React from "react";
import {
  actionMovies,
  comedyMovies,
  documentaryMovies,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingMovies,
} from "../apis/fetchMovies";
import Banner from "../components/Banner";
import { Genre } from "../components/Genre";
import { MORE_INFO_BUTTON, PLAY_BUTTON } from "../constants/bannerButtons";

const Movies = () => {
  return (
    <div>
      <Banner
        fetchGenre={trendingMovies}
        playButton={PLAY_BUTTON}
        moreInfoButton={MORE_INFO_BUTTON}
      />
      <Genre title="Top-Rated" fetchGenre={topRated} />
      <Genre title="Action" fetchGenre={actionMovies} />
      <Genre title="Comedy" fetchGenre={comedyMovies} />
      <Genre title="Romance" fetchGenre={romanceMovies} />
      <Genre title="Horror" fetchGenre={horrorMovies} />
      <Genre title="Documentary" fetchGenre={documentaryMovies} />
    </div>
  );
};

export default Movies;
