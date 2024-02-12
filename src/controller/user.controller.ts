import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entity/User.entity";
import { CustomError } from "../error";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { DeleteResult } from "typeorm";

const userRepository = AppDataSource.getRepository(User);
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
      id: "",
      avatarImg: req.body.avatarImg || "",
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
      res.json({ userData: result, token });
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
      const user: User | undefined = await userRepository.findOne({
        where: { email: req.body.email },
      });
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
      res.json({ userData: user, token });
    } catch (err) {
      err.message = "Server error: user was not authorized"; //add my err
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
      next(err);
    }
  };
  static getOneUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: string = req.params.id;
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
      next(err);
    }
  };
  static updateUser = async (req: Request, res: Response, next: NextFunction
    ): Promise<void>  => {
    try {
      const id:string = req.params.id;
      if (!id) {
        throw new CustomError("User id is not correct", 400);
      }
      // const user: User = await userRepository.findOneBy({
      //   id: req.params.id,
      // });
      // if (!user) {
      //   throw new CustomError("User is not found", 404);
      // }

      if (req.body.email === '') {
        throw new CustomError("Email field have to be filled", 400);
      }

      if (req.body.email) {
      const userWithEmail: User = await userRepository.findOneBy({
        email: req.body.email,
      });

      // if(userWithEmail && (userWithEmail.id !== user.id)) {
      //     throw new CustomError("This email has arleady been registered", 400);
      // }
    }

      if (req.body.password) {
        const salt: string = await bcrypt.genSalt(10);
        const hash: string = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
      }

      // userRepository.merge(user, req.body);
      const results = await userRepository.update(id, {
        fullName: req.body.fullName,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
        avatarImg: req.file?.filename || req.body.avatarImg,
      });

      const user: User = await userRepository.findOneBy({
        id: req.params.id,
      });
      if (!user) {
        throw new CustomError("User is not found", 404);
      }

      res.json(user);
    } catch (err) {
      next(err);
    }
  }
}
export default UserController;
