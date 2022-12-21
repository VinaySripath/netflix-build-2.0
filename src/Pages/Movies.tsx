import React from "react";
import {
  actionMovies,
  comedyMovies,
  documentaryMovies,
  horrorMovies,
  romanceMovies,
  topRated,
} from "../apis/fetchMovies";
import { Genre } from "../components/Genre";

const Movies = () => {
  return (
    <div className="pt-28">
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
