import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IGenreResponse } from "../types/genreResponse";
import { useGenre } from "../hooks/useGenre";
import { BASE_URL } from "../constants/baseImageUrl";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LazyImage from "./LazyImage";

type GenreProps = {
  title: string;
  fetchGenre: () => Promise<{ results: IGenreResponse[]; type: string }>;
  isGenreRowLarge?: boolean;
};

export const Genre = ({
  title,
  fetchGenre,
  isGenreRowLarge = false,
}: GenreProps) => {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 12,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const showInfoHandler = (
    id: string,
    movieGenres: [],
    type: string | undefined
  ) => {
    navigate("/showinfo", {
      state: { id, movieGenres, type },
    });
  };

  const returnedData = useGenre({ fetchGenre });
  const movies = returnedData.genre;
  const type = returnedData.type;

  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="text-white ml-5">
      <h1 className="text-20 tablet:text-24 font-bold pt-4 tablet:pt-6 pb-2 pl-2 tablet:pl-4">
        {title}
      </h1>
      <Carousel responsive={responsive}>
        {movies.length !== 0
          ? movies.map((movie: IGenreResponse) => {
              return (
                Boolean(movie.poster_path) && (
                  <LazyImage
                    styleClass="transition-transform duration-500 hover:scale-120 hover:cursor-pointer max-h-80 h-72 pt-6 pb-6 px-3"
                    src={`${BASE_URL}${movie.poster_path}`}
                    alt={movie.name}
                    key={movie.id}
                    id={movie.id}
                    genre_ids={movie.genre_ids}
                    type={type}
                    showInfoHandler={showInfoHandler}
                  />
                )
              );
            })
          : skeleton.map(() => {
              return (
                <Skeleton
                  key={0}
                  baseColor="#202020"
                  highlightColor="#444"
                  className={"h-72 w-42 pt-6 pb-6 px-3"}
                ></Skeleton>
              );
            })}
      </Carousel>
    </div>
  );
};
