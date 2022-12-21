import { useEffect, useState } from "react";
import { IGenreResponse } from "../types/genreResponse";

type useGenreProps = {
  fetchGenre: () => Promise<{ results: IGenreResponse[]; type: string }>;
};

export const useGenre = ({ fetchGenre }: useGenreProps) => {
  const [genre, setGenre] = useState<IGenreResponse[]>([]);
  const [type, setType] = useState<string>();
  useEffect(() => {
    try {
      const fetchMovieData = async () => {
        const genreFetched = await fetchGenre();
        setGenre(genreFetched.results);
        setType(genreFetched.type);
      };
      fetchMovieData();
    } catch (error) {
      throw error;
    }
  }, []);
  return { genre, type };
};
