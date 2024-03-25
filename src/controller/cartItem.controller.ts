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
            
            const user = await UserRepository.findOne({ where: { id: req.body.userUniqId } });
        
           
            const book = await BookRepository.findOne({ where: { id: +req.params.id } });

            const cart = await CartItemRepository.findOne({ where: { user, book} });
            if (cart) {
              cart.countBook = cart.countBook+1;
              await CartItemRepository.save(cart);
              const result = await CartItemRepository.findOne({ where: { user, book}, relations: ["book", "book.author"] });
              res.json(result);
              return;
            }
        
           
            const cartItem = new CartItem();
            cartItem.countBook = 1;
            cartItem.user = user;
            cartItem.book = book;
        
           
           await CartItemRepository.save(cartItem);
           const result = await CartItemRepository.findOne({ where: { user, book}, relations: ["book", "book.author"] });
           res.json(result);
           
          } catch (err) {
            next(err);
          }
    }
  static getCartItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const cartItems = await CartItemRepository.find({
         where: { user: req.body.userUniqId },
          relations: ["book", "book.author"],
          order: { created_at: "DESC" }
          });
      const cartBookAmount = cartItems.reduce((acc, item) => {
        acc.number = acc.number+item.countBook;
        acc.summ = acc.summ + (item.book.price*item.countBook);
        console.log(item.book.price);
        return acc
      },{number: 0, summ: 0})
      const result = {
        books: cartItems,
        cartBookAmount: cartBookAmount.number,
        summ: cartBookAmount.summ,
      }      
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
        const user = await UserRepository.findOne({ where: { id: req.body.userUniqId } });
          
        const book = await BookRepository.findOne({ where: { id: +req.params.id } });

        const cart = await CartItemRepository.findOne({ where: { user, book}, relations: ['book', 'book.author'] });

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
          const user = await UserRepository.findOne({ where: { id: req.body.userUniqId } });
            
          const book = await BookRepository.findOne({ where: { id: +req.params.id } });
  
          const cart = await CartItemRepository.findOne({ where: { user, book}, relations: ['book'] });
        
          await CartItemRepository.remove(cart); 
         
          res.json(cart);
        } catch (err) {
          next(err);
        }
      };
}
export default cartItemController;

//   static getGenres = async (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<void> => {
  //     try {
  //       const Genres: Genre[] = await genreRepository.find({relations:{books:true}});
  //       if (!Genres) {
  //         throw new CustomError("Users are not found", 404);
  //       }
  //       res.json(Genres);
  //     } catch (err) {
  //       next(err);
  //     }
  //   };
  //   static getOneGenre = async (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<void> => {
  //     try {
  //       const id:number = +req.params.id;
  //       if (!id) {
  //         throw new CustomError("Id of genres is not correct", 400);
  //       }
  //       const genre: Genre[] = await genreRepository.find({
  //         where: { id },
  //         relations:{books:true}
  //       });
  //       if (!genre) {
  //         throw new CustomError("Genre is not found", 404);
  //       }
  //       res.json(genre);
  //     } catch (err) {
  //       next(err);
  //     }
  //   };