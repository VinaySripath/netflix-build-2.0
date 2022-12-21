import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useGenre } from "../hooks/useGenre";
import { useNavigate } from "react-router";
import { generateRandomElement } from "../utilities/generateRandomElement";
import { truncate } from "../utilities/truncateDesc";

type BannerProps = {
  fetchGenre: () => Promise<{ results: IGenreResponse[]; type: string }>;
  playButton: string;
  moreInfoButton: string;
};

const Banner = ({ fetchGenre, playButton, moreInfoButton }: BannerProps) => {
  const returnedData = useGenre({ fetchGenre });
  const movies: IGenreResponse[] = returnedData.genre;
  const type = returnedData.type;
  const navigate = useNavigate();

  const randomMovieBanner = generateRandomElement(movies);

  const shortDescription = truncate(randomMovieBanner?.overview || " ", 150);

  const handleMoreInfo = () => {
    navigate("/showinfo", {
      state: {
        id: randomMovieBanner.id,
        movieGenres: randomMovieBanner.genre_ids,
        type,
      },
    });
  };

  return (
    <div
      className="flex flex-col justify-between relative h-128 text-white object-contain bg-primary bg-right bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 255, 0)
        ), url("${BASE_URL}${randomMovieBanner?.backdrop_path}")`,
      }}
    >
      <div className="h-48 m-8 pt-36 ">
        <h1 className="text-48 font-extrabold mb-4">
          {randomMovieBanner?.name ||
            randomMovieBanner?.title ||
            randomMovieBanner?.original_name}
        </h1>
        <div className="flex">
          <button className="cursor-pointer text-white border-none outline-none rounded font-bold w-32 px-8 py-1.5 mr-4 bg-grey-dark/50 hover:text-black hover:bg-grey-light hover:transition-all hover:duration-200">
            {playButton}
          </button>
          <button
            onClick={handleMoreInfo}
            className="cursor-pointer flex justify-around text-white border-none outline-none rounded font-bold w-36 p-4 py-1.5 mr-4 bg-grey-dark/50 hover:text-black hover:bg-grey-light hover:transition-all hover:duration-200"
          >
            <AiOutlineInfoCircle size={20} className="relative top-0.5" />
            {moreInfoButton}
          </button>
        </div>
        <h1 className="text-base pt-4 max-w-sm h-22">{shortDescription}</h1>
      </div>
      <div className="h-32 bg-gradient-primary" />
    </div>
  );
};

export default Banner;
