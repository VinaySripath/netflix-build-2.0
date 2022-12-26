import React from "react";
import {
  comedySeries,
  documentarySeries,
  netflixOriginals,
  popularSeries,
  romanceSeries,
  topRatedSeries,
} from "../apis/fetchSeries";
import Banner from "../components/Banner";
import { Genre } from "../components/Genre";
import { MORE_INFO_BUTTON, PLAY_BUTTON } from "../constants/bannerButtons";

const Series = () => {
  return (
    <div>
      <Banner
        fetchGenre={popularSeries}
        playButton={PLAY_BUTTON}
        moreInfoButton={MORE_INFO_BUTTON}
      />
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
