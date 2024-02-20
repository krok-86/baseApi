import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Book } from "../entity/Book.entity";
import { Between, In, OrderByCondition} from "typeorm";

const bookRepository = AppDataSource.getRepository(Book);

  class BookController {
    static getBooks = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        let { genre, price, sort, limit, page } = req.query;
        const pageNum = typeof page === "string" ? parseInt(page) : 1;
        const limitNum = typeof limit === "string" ? parseInt(limit) : 1;

        const offset = (pageNum - 1) * limitNum;

        let books: Book[] = [];
        let orderCondition: OrderByCondition = {};
        let whereCondition: any = {
          relations: ["genre"],
          skip: offset,
          take: limitNum,
          join: {
            alias: "book",
            innerJoinAndSelect: {
              author: "book.author",
            }
          }
        };

        if (genre && typeof genre === 'string') {
          const genresArr: number[] = genre.split('-').map((item) => Number(item));
          whereCondition.where = {
            ...whereCondition.where,
            genreId: In(genresArr)
          };
        }
  
        if (price && typeof price === "string") {
          const priceRange = price.split("-");
          whereCondition.where = {
            ...whereCondition.where,
            price: Between(Number(priceRange[0]), Number(priceRange[1]))
          };
        }
  
        switch (sort) {
          case "author":
            orderCondition = {
              "author.name": "ASC"
            };
            break;
          case "name":
            orderCondition.title = "ASC";
            break;
          default:
            orderCondition.price = "ASC";
            break;
        }
  
        whereCondition.order = orderCondition;
  
        const totalCount = await bookRepository.count(whereCondition);
        const maxPage = Math.ceil(totalCount / limitNum);
  
        books = await bookRepository.find(whereCondition);
  
        if (books.length === 0) {
          throw new CustomError("Books are not found", 404);
        }
  
        res.json({
          data: books,
          pagination: {
            currentPage: pageNum,
            totalItems: totalCount,
            perPage: limitNum,
            maxPage: maxPage
          }
        });
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
      const id: number = Number(req.params.id);
      if (!id) {
        throw new CustomError("Id of books is not correct", 400);
      }
      const book: Book[] = await bookRepository.find({
        where: { id },
        relations: { author: true }
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
  ): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      if (!id) {
        throw new CustomError("User id is not correct", 400);
      }
      await bookRepository.update(id, {
        rating: req.body.rating
      });

      const book: Book = await bookRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: { author: true }
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