import React from "react";
import {
  netflixOriginals,
  topRated,
  trendingMovies,
  horrorMovies,
  documentaryMovies,
} from "../apis/fetchMovies";
import { actionMovies, comedyMovies, romanceMovies } from "../apis/fetchMovies";
import Banner from "../components/Banner";
import { Genre } from "../components/Genre";
import { MORE_INFO_BUTTON, PLAY_BUTTON } from "../constants/bannerButtons";

const HomeScreen = () => {
  return (
    <div>
      <Banner
        fetchGenre={netflixOriginals}
        playButton={PLAY_BUTTON}
        moreInfoButton={MORE_INFO_BUTTON}
      />
      <Genre
        title="Netflix-Originals"
        fetchGenre={netflixOriginals}
        isGenreRowLarge={true}
      />
      <Genre title="Trending" fetchGenre={trendingMovies} />
      <Genre title="Top-Rated" fetchGenre={topRated} />
      <Genre title="Action" fetchGenre={actionMovies} />
      <Genre title="Comedy" fetchGenre={comedyMovies} />
      <Genre title="Romance" fetchGenre={romanceMovies} />
      <Genre title="Horror" fetchGenre={horrorMovies} />
      <Genre title="Documentary" fetchGenre={documentaryMovies} />
    </div>
  );
};

export default HomeScreen;
