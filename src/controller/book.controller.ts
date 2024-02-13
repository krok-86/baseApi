import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Book } from "../entity/Book.entity";

const bookRepository = AppDataSource.getRepository(Book);

class BookController {
  static getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const books: Book[] = await bookRepository.find();
      if (!books) {
        throw new CustomError("Users are not found", 404);
      }
      res.json(books);
    } catch (err) {
      next(err);
    }
  };
  static getOneBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id:number = Number(req.params.id);
      if (!id) {
        throw new CustomError("Id of books is not correct", 400);
      }
      const book: Book[] = await bookRepository.find({
        where: { id },
      });
      if (!book) {
        throw new CustomError("Book is not found", 404);
      }
      res.json(book);
    } catch (err) {
      next(err);
    }
  };
}
  export default BookController;