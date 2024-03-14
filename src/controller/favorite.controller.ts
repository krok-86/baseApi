// import { Request, Response, NextFunction } from "express";
// import AppDataSource from "../data-source";
// import { User } from "../entity/User.entity";
// import { CustomError } from "../error";
// import { Book } from "../entity/Book.entity";
// import { FindManyOptions } from "typeorm";

// const userRepository = AppDataSource.getRepository(User);
// const bookRepository = AppDataSource.getRepository(Book);

// class FavoriteController {
//     static addBookToFavorite = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//       ): Promise<void> => {
//         try {
//           const userId = req.params.userId;
//           const bookId = req.body.bookId;
//           const user = await userRepository.findOne(userId, {
//             relations: ["favorite"]
//           });
//           if (!user) {
//             throw new CustomError("User not found", 404);
//           }
//           const bookToAdd = await bookRepository.findOne(bookId);
//           if (!bookToAdd) {
//             throw new CustomError("Book not found", 404);
//           }
//           const isBookAlreadyAdded = user.favorite.some(book => book.id === bookId);
//           if (isBookAlreadyAdded) {
//             throw new CustomError("Book already in favorites", 400);
//           }
//           user.favorite.push(bookToAdd);
//           await userRepository.save(user);
    
//           res.json({ message: "Book added to favorites successfully" });
//         } catch (err) {
//           err.message = "Server error: user was not created";
//           err.code = "500";
//           next(err);
//         }
//     }; 
// }
// export default FavoriteController;