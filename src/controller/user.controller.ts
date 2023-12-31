import { Request, Response, NextFunction } from "express";
import  AppDataSource  from "../data-source";
import  {User}  from "../entity/User.entity";
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
      fullName: req.body.fullName,
      email: req.body.email,
      dob: req.body.dob,
      password: req.body.password,
      id: "",
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
      res.json({ result, token });
    } catch (err) {
      // err.message = "Server error: user was not created";
      // err.code = "500";
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
      res.json({ user, token });
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



  static getUser = async (req: Request, res: Response, next: NextFunction
    ): Promise<void>  => {
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
  static getOneUser = async (req: Request, res: Response, next: NextFunction
    ): Promise<void> => {
      try {
        const id:string = req.params.id;
        if (!id) {
          throw new CustomError("User's id is not correct", 400);
        }
        const user: User[] = await userRepository.find({
          where: { id }
        });
        if (!user) {
          throw new CustomError("User is not found", 404);
        }
        res.json(user);
      } catch (err) {
        next(err);
      }
  };
  static deleteUser = async (req: Request, res: Response, next: NextFunction
    ): Promise<void> => {
    try {
      const id: string = req.params.id;
      if (!id) {
        throw new CustomError("User id is not correct", 400);// ошибка не предан параметр
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
      const user: User = await userRepository.findOneBy({
        id: req.params.id,
      });
      if (!user) {
        throw new CustomError("User is not found", 404);
      }
      userRepository.merge(user, req.body);
      const results = await userRepository.save(user);
      res.json(results);
    } catch (err) {
      next(err);
    }
  }
}
export default UserController;

// app.get("/users", async function (req: Request, res: Response) {
//     const users = await userRepository.find()
//     res.json(users)
//   })

//   app.get("/users/:id", async function (req: Request, res: Response) {
//     const results = await userRepository.findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
//   })

//   app.post("/users", async function (req: Request, res: Response) {
//     const user = await userRepository.create(req.body)
//     const results = await userRepository.save(user)
//     return res.send(results)
//   })

//   app.put("/users/:id", async function (req: Request, res: Response) {
//     const user = await userRepository.findOneBy({
//         id: req.params.id,
//     })
//     userRepository.merge(user, req.body)
//     const results = await userRepository.save(user)
//     return res.send(results)
//   })

//   app.delete("/users/:id", async function (req: Request, res: Response) {
//     const results = await userRepository.delete(req.params.id)
//     return res.send(results)
//   })
