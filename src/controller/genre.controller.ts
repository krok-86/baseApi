import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Genre } from "../entity/Genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

class GenreController {
  static getGenres = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const Genres: Genre[] = await genreRepository.find({
        relations: { books: true },
      });
      if (!Genres) {
        throw new CustomError("Users are not found", 404);
      }
      res.json(Genres);
    } catch (err) {
      next(err);
    }
  };
  static getOneGenre = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: number = +req.params.id;
      if (!id) {
        throw new CustomError("Id of genres is not correct", 400);
      }
      const genre: Genre[] = await genreRepository.find({
        where: { id },
        relations: { books: true },
      });
      if (!genre) {
        throw new CustomError("Genre is not found", 404);
      }
      res.json(genre);
    } catch (err) {
      next(err);
    }
  };
}
export default GenreController;
