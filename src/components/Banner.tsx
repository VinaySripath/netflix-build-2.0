import { BASE_URL } from "../constants/baseImageUrl";
import { IGenreResponse } from "../types/genreResponse";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useGenre } from "../hooks/useGenre";
import { useLocation, useNavigate } from "react-router";
import { generateRandomElement } from "../utilities/generateRandomElement";
import { truncate } from "../utilities/truncateDesc";
import { BsFillPlayFill } from "react-icons/bs";

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
  const location = useLocation();

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
      className="flex flex-col justify-between relative h-118 laptop:h-128 text-white object-contain bg-small laptop:bg-primary bg-right bg-no-repeat overflow-clip"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 255, 0)
        ), url("${BASE_URL}${
          randomMovieBanner?.backdrop_path || navigate(location.pathname)
        }")`,
      }}
    >
      <div className="h-24 laptop:h-48 m-8 pt-20 laptop:pt-36 ">
        <h1 className="text-20 laptop:text-48 font-extrabold mb-2 tablet:mb-4">
          {randomMovieBanner?.name ||
            randomMovieBanner?.title ||
            randomMovieBanner?.original_name}
        </h1>
        <div className="flex">
          <button className="cursor-pointer flex justify-center items-center text-white text-14 tablet:text-16 border-none outline-none rounded font-bold w-24 tablet:w-32 px-2 tablet:px-8 py-1.5 mr-4 bg-red-500/80 tablet:bg-grey-dark/50 laptop:hover:text-black laptop:hover:bg-grey-light laptop:hover:transition-all laptop:hover:duration-200">
            <BsFillPlayFill className="mr-2" size={20} />
            {playButton}
          </button>
          <button
            onClick={handleMoreInfo}
            className="cursor-pointer flex justify-around items-center text-white text-14 tablet:text-base border-none outline-none rounded font-bold w-32 tablet:w-36 px-2 tablet:px-4 py-1.5 mr-4 bg-grey-dark/50 laptop:hover:text-black laptop:hover:bg-grey-light laptop:hover:transition-all laptop:hover:duration-200"
          >
            <AiOutlineInfoCircle size={20} className="relative" />
            {moreInfoButton}
          </button>
        </div>
        <h1 className="text-12 tablet:text-16 pt-4 max-w-sm h-22">
          {shortDescription}
        </h1>
      </div>
      <div className="h-24 laptop:h-32 bg-gradient-primary" />
    </div>
  );
};

export default Banner;
