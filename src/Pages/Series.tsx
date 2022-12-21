import React from "react";
import {
  comedySeries,
  documentarySeries,
  netflixOriginals,
  popularSeries,
  romanceSeries,
  topRatedSeries,
} from "../apis/fetchSeries";
import { Genre } from "../components/Genre";

const Series = () => {
  return (
    <div className="pt-28">
      <Genre title="Netflix Originals" fetchGenre={netflixOriginals} />
      <Genre title="Top-Rated" fetchGenre={topRatedSeries} />
      <Genre title="Popular" fetchGenre={popularSeries} />
      <Genre title="Romance" fetchGenre={romanceSeries} />
      <Genre title="Comedy" fetchGenre={comedySeries} />
      <Genre title="Documentary" fetchGenre={documentarySeries} />
    </div>
  );
};

export default Series;
