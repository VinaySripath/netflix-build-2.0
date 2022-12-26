import { IGenreResponse } from "./genreResponse";

export type discover = (
  genreId?: string
) => Promise<{ results: IGenreResponse[]; type: string }>;
