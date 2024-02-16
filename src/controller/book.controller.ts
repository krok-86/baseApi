import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Book } from "../entity/Book.entity";

const bookRepository = AppDataSource.getRepository(Book);

// type IdType = {
// genreId: number;
// }
class BookController {
  static getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let { genreId, limit, page} = req.query;
      const pageNum = typeof page === "string" ? parseInt(page) : 1;
      const limitNum = typeof limit === "string" ? parseInt(limit) : 9;
      
      const offset = (pageNum - 1) * limitNum;

      let books: Book[] = [];

       if(!genreId) {
         books = await bookRepository.find({
          relations: ["genre"],
          skip: offset,
          take: limitNum
          });
       } else {
        books = await bookRepository.find({
        where: {
          genre: { id: Number(genreId) }
        },
        relations: ["genre"],
        skip: offset,
        take: limitNum
        });
      }
      if (books.length === 0) {
        throw new CustomError("Books are not found", 404);
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
        relations:{author:true}
      });
      if (!book) {
        throw new CustomError("Book is not found", 404);
      }
      res.json(book);
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (req: Request, res: Response, next: NextFunction
    ): Promise<void>  => {
    try {
      const id:number = Number(req.params.id);
      if (!id) {
        throw new CustomError("User id is not correct", 400);
      }
      const results = await bookRepository.update(id, {
        rating: req.body.rating
      });

      const book: Book = await bookRepository.findOne({
        where: {id: Number(req.params.id)},
        relations:{author:true}
      });
      if (!book) {
        throw new CustomError("User is not found", 404);
      }

      res.json(book);
    } catch (err) {
      next(err);
    }
  }
}

  export default BookController;