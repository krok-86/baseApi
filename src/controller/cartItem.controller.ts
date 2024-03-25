import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Book } from "../entity/Book.entity";
import { CartItem } from "../entity/CartItem.entity";
import { User } from "../entity/User.entity";

const CartItemRepository = AppDataSource.getRepository(CartItem);
const UserRepository = AppDataSource.getRepository(User);
const BookRepository = AppDataSource.getRepository(Book);

class cartItemController {
  static addCartItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await UserRepository.findOne({
        where: { id: req.body.userUniqId },
      });
      if (!user) {
        throw new CustomError("User was not found", 403);
      }
      const book = await BookRepository.findOne({
        where: { id: +req.params.id },
      });
      if (!book) {
        throw new CustomError("Book was not found", 403);
      }
      const cart = await CartItemRepository.findOne({ where: { user, book } });
      if (cart) {
        cart.countBook += cart.countBook;
        await CartItemRepository.save(cart);
        const result = await CartItemRepository.findOne({
          where: { user, book },
          relations: ["book", "book.author"],
        });
        res.json(result);
        return;
      }
      const cartItem = new CartItem();
      cartItem.countBook = 1;
      cartItem.user = user;
      cartItem.book = book;
      await CartItemRepository.save(cartItem);
      const result = await CartItemRepository.findOne({
        where: { user, book },
        relations: ["book", "book.author"],
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
  static getCartItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const cartItems = await CartItemRepository.find({
        where: { user: req.body.userUniqId },
        relations: ["book", "book.author"],
        order: { created_at: "DESC" },
      });
      if (!cartItems) {
        throw new CustomError("Book or User was not found", 403);
      }
      const cartBookAmount = cartItems.reduce(
        (acc, item) => {
          acc.number = acc.number + item.countBook;
          acc.summ = acc.summ + item.book.price * item.countBook;
          return acc;
        },
        { number: 0, summ: 0 }
      );
      const result = {
        books: cartItems,
        cartBookAmount: cartBookAmount.number,
        summ: cartBookAmount.summ,
      };
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
  static removeCartItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await UserRepository.findOne({
        where: { id: req.body.userUniqId },
      });
      if (!user) {
        throw new CustomError("User was not found", 403);
      }
      const book = await BookRepository.findOne({
        where: { id: +req.params.id },
      });
      if (!book) {
        throw new CustomError("Book was not found", 403);
      }
      const cart = await CartItemRepository.findOne({
        where: { user, book },
        relations: ["book", "book.author"],
      });
      if (!cart) {
        throw new CustomError("Book or User was not found", 403);
      }
      if (cart.countBook > 1) {
        cart.countBook -= 1;
        await CartItemRepository.save(cart);
      } else {
        cart.countBook = 0;
        await CartItemRepository.remove(cart);
      }
      res.json(cart);
    } catch (err) {
      next(err);
    }
  };
  static deleteStackCartItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await UserRepository.findOne({
        where: { id: req.body.userUniqId },
      });
      if (!user) {
        throw new CustomError("User was not found", 403);
      }
      const book = await BookRepository.findOne({
        where: { id: +req.params.id },
      });
      if (!book) {
        throw new CustomError("Book was not found", 403);
      }
      const cart = await CartItemRepository.findOne({
        where: { user, book },
        relations: ["book"],
      });
      if (!cart) {
        throw new CustomError("Book or User was not found", 403);
      }
      await CartItemRepository.remove(cart);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  };
}
export default cartItemController;
