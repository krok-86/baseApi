import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entity/User.entity";
import { CustomError } from "../error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { DeleteResult, In } from "typeorm";
import { Book } from "../entity/Book.entity";

const userRepository = AppDataSource.getRepository(User);
const bookRepository = AppDataSource.getRepository(Book);
class UserController {
  static registrationUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const newUser: User = {
      fullName: req.body.fullName || null,
      email: req.body.email,
      dob: req.body.dob || null,
      password: req.body.password,
      id: Number(),
      avatarImg: req.body.avatarImg || "",
      rating: null,
      posts: [],
      favorite: null,
      cartItems: null,
    };
    try {
      const userWithEmail: User | undefined = await userRepository.findOne({
        where: { email: newUser.email },
      });
      if (userWithEmail) {
        throw new CustomError("This email has already been registered", 403);
      }
      const salt: string = await bcrypt.genSalt(10);
      const hash: string = await bcrypt.hash(newUser.password, salt);
      const user: User = await userRepository.save({
        fullName: newUser.fullName,
        email: newUser.email,
        dob: newUser.dob,
        password: hash,
        avatarImg: newUser.avatarImg,
      });
      const token: string = jwt.sign(
        {
          _id: user.id,
        },
        "secret123",
        {
          expiresIn: "7d",
        }
      );
      const result: User = await userRepository.save(user);
      res.json({ userData: result, token, message: "The user has been registered!" });
    } catch (err) {
      err.message = "Server error: user was not created";
      err.code = "500";
      next(err);
    }
  };
  static authorizationUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: User | undefined = await userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.email = :email", { email: req.body.email })
        .getOne();
      if (!user) {
        throw new CustomError("User data not found", 404);
      }
      const isValidPass: boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPass) {
        throw new CustomError("email or password is wrong", 404);
      }
      const token: string = jwt.sign(
        {
          _id: user.id,
        },
        "secret123",
        {
          expiresIn: "7d",
        }
      );
      res.json({ userData: user, token, message: "The user has been authorizationed!" });
    } catch (err) {
      err.message = "Server error: user was not authorized";
      err.code = "500";
      next(err);
    }
  };

  static authorizationMeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: User = await userRepository.findOne({
        where: { id: req.body.userUniqId },
      });
      if (!user) {
        throw new CustomError("user not found", 404);
      }
      res.json(user);
    } catch (err) {
      err.message = "Server error: user was not found";
      err.code = "500";
      next(err);
    }
  };

  static getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users: User[] = await userRepository.find();
      if (!users) {
        throw new CustomError("Users are not found", 404);
      }
      res.json(users);
    } catch (err) {
      err.message = "Server error: users was not found";
      err.code = "500";
      next(err);
    }
  };
  static getOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      if (!id) {
        throw new CustomError("User's id is not correct", 400);
      }
      const user: User[] = await userRepository.find({
        where: { id },
      });
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      res.json(user);
    } catch (err) {
      err.message = "Server error: user was not found";
      err.code = "500";
      next(err);
    }
  };
  static deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: string = req.params.id;
      if (!id) {
        throw new CustomError("User id is not correct", 400); // ошибка не предан параметр
      }
      const user: DeleteResult = await userRepository.delete(req.params.id); // юзер не найден или уже удален
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      res.json({ message: "User deleted!" });
    } catch (err) {
      err.message = "Server error: user was not found";
      err.code = "500";
      next(err);
    }
  };
  static updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: number = Number(req.params.id);
      if (!id) {
        throw new CustomError("User id is not correct", 400);
      }
      if (req.body.email === "") {
        throw new CustomError("Email field have to be filled", 400);
      }
      if (req.body.email) {
        const userWithEmail: User = await userRepository.findOneBy({
          email: req.body.email,
        });
      }
      if (req.body.password) {
        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
      }
      const results = await userRepository.update(id, {
        fullName: req.body.fullName,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
        avatarImg: req.file?.filename || req.body.avatarImg,
      });
      const user: User | undefined = await userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where("user.id = :id", { id: req.params.id })
        .getOne();
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      res.json(user);
    } catch (err) {
      err.message = "Server error: user was not update";
      err.code = "500";
      next(err);
    }
  };

  static addBookToFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookId = req.params.id;
      const user = await userRepository.findOne({
        where: { id: req.body.userUniqId },
        relations: ["favorite"],
      });
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      const bookToAdd = await bookRepository.findOne({
        where: { id: +bookId },
      });
      if (!bookToAdd) {
        throw new CustomError("Book not found", 404);
      }
      const isBookAlreadyAdded = user.favorite.some(
        (book) => book.id === +bookId
      );
      if (isBookAlreadyAdded) {
        const dislike = user.favorite.filter((el) => el.id !== +bookId);
        user.favorite = dislike;
      } else {
        user.favorite.push(bookToAdd);
      }
      await userRepository.save(user);
      res.json(user);
    } catch (err) {
      err.message = "Server error: The book has not been added to favorites";
      err.code = "500";
      next(err);
    }
  };
  static getFavoriteBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userRepository.findOne({
        where: { id: +req.body.userUniqId },
        relations: ["favorite", "favorite.author"],
      });
      if (!user) {
        throw new CustomError("User not found", 404);
      }
      res.json(user.favorite);
    } catch (err) {
      err.message = "Server error: Сould not get favorite books";
      err.code = "500";
      next(err);
    }
  };
}
export default UserController;
