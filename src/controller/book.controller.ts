import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Book } from "../entity/Book.entity";
import {
  Between,
  FindManyOptions,
  FindOptionsOrder,
  In,
} from "typeorm";
import { Rating } from "../entity/Rating.entyty";
import { Author } from "../entity/Author.entity";

const bookRepository = AppDataSource.getRepository(Book);
const ratingRepository = AppDataSource.getRepository(Rating);

class BookController {
  static getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let { genre, price, sort, limit, page } = req.query;
      const pageNum = typeof page === "string" ? parseInt(page) : 1;
      const limitNum = typeof limit === "string" ? parseInt(limit) : 12;
      const offset = (pageNum - 1) * limitNum;
      let whereCondition: FindManyOptions<Book> = {
        relations: ["genre", "author"],
        skip: offset,
        take: limitNum,
        join: {
          alias: "book",
          innerJoinAndSelect: {
            author: "book.author",
          },
        },
      };

      if (genre && typeof genre === "string") {
        const genresArr: number[] = genre
          .split("-")
          .map((item) => Number(item));
        whereCondition.where = {
          ...whereCondition.where,
          genreId: In(genresArr),
        };
      }

      if (price && typeof price === "string") {
        const priceRange = price.split("-");
        whereCondition.where = {
          ...whereCondition.where,
          price: Between(Number(priceRange[0]), Number(priceRange[1])),
        };
      }

      let orderCondition: FindOptionsOrder<Book> = {};

      switch (sort) {
        case "author":
          orderCondition = { author: { name: "DESC" } };
          break;
        case "name":
          orderCondition = { title: "ASC" };
          break;
        default:
          orderCondition = { price: "ASC" };
          break;
      }

      whereCondition.order = orderCondition;

      const [books, totalCount] = await bookRepository.findAndCount(
        whereCondition
      );

      const maxPage = Math.ceil(totalCount / limitNum);
      if (books.length === 0) {
        //fix?
        throw new CustomError("Books are not found", 404);
      }
      res.json({
        data: books,
        pagination: {
          currentPage: pageNum,
          totalItems: totalCount,
          perPage: limitNum,
          maxPage: maxPage,
        },
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
      const book = await bookRepository.findOne({
        where: { id },
        relations: { author: true },
      });
      if (!book) {
        throw new CustomError("Book is not found", 404);
      }
      res.json(book);
    } catch (err) {
      next(err);
    }
  };

  static updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      if (!id) {
        throw new CustomError("Book id is not correct", 400);
      }
      const bookId: number = Number(req.params.id);
      if (!bookId) {
        throw new CustomError("Book id is not correct", 400);
      }

      const userId: number = +req.body.userId;
      if (!userId) {
        throw new CustomError("User id is not provided", 400);
      }

      let rating = await ratingRepository.findOne({
        where: { userId, bookId },
      });
      if (!rating) {
        rating = ratingRepository.create({
          userId,
          bookId,
          ratingStar: req.body.rating,
        });
      } else {
        rating.ratingStar = req.body.rating;
      }

      await ratingRepository.save(rating);

      const ratingsOneBook = await ratingRepository.find({ where: { bookId } });
      if (!ratingsOneBook.length) {
        throw new CustomError("Rating is not found", 404);
      }
      const mathRating =
        ratingsOneBook.reduce((acc, current) => {
          return acc + current.ratingStar;
        }, 0) / ratingsOneBook.length;

      await bookRepository.update(id, {
        rating: Math.ceil(mathRating),
      });

      const book: Book = await bookRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: { author: true },
      });
      if (!book) {
        throw new CustomError("User is not found", 404);
      }

      res.json(book);
    } catch (err) {
      next(err);
    }
  };
  static getRecommendedBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let books = await bookRepository
        .createQueryBuilder("book")
        .leftJoinAndSelect("book.author", "author")
        .where("book.rating = :rating", { rating: 5 })
        .orderBy("random()")
        .getMany();

      if (books.length > 4) {
        books = books.slice(0, 4);
      }
      const randomBook: Book = {
        id: Math.floor(Math.random() * 1000),
        title: "",
        description: "",
        picture: "",
        rating: 0,
        price: 0,
        dateOfIssue: undefined,
        authorId: 0,
        genreId: 0,
        ratings: [],
        cartItems: [],
        posts: [],
        genre: [],
        author: new Author(),
      };
      books.push(randomBook);
      res.json(books);
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;
