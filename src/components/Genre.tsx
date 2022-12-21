import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cls from "classnames";
import { IGenreResponse } from "../types/genreResponse";
import { useGenre } from "../hooks/useGenre";
import { BASE_URL } from "../constants/baseImageUrl";
import { useNavigate } from "react-router";

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
      items: 4,
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

  return (
    <div className="text-white ml-5">
      <h1 className="text-24 font-bold pt-6 pb-2 pl-4">{title}</h1>
      <Carousel responsive={responsive}>
        {movies.map((movie: IGenreResponse) => {
          if (
            (isGenreRowLarge && movie.poster_path) ||
            (!isGenreRowLarge && movie.backdrop_path)
          ) {
            return (
              <img
                className={`max-h-40 object-contain p-3 w-full transition-transform duration-500 hover:scale-120 ${cls(
                  { "max-h-80 pt-6 pb-6": isGenreRowLarge }
                )}`}
                key={movie.id}
                src={`${BASE_URL}${
                  isGenreRowLarge ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                onClick={() => showInfoHandler(movie.id, movie.genre_ids, type)}
              />
            );
          } else {
            return null;
          }
        })}
      </Carousel>
    </div>
  );
};
