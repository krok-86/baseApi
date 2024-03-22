import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { CustomError } from "../error";
import { Cart } from "../entity/Cart.entity";

const CartRepository = AppDataSource.getRepository(Cart);

class cartController {
    static addCart = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
            // const bookId
          res.json();
        } catch (err) {
          next(err);
        }
    }
  static getCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.json();
    } catch (err) {
      next(err);
    }
  };
}
export default cartController;