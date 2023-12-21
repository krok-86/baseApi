import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

// interface UserSchema {
//     fullName: string;
//     password: string;
//     dob: Date;
//     email: string;
//   }
const validation =
  (schema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body;

    try {
      await schema.validate(body);
      next();
    } catch (err) {
      err.message = err.errors[0];
      err.status = 400;
      next(err);
    }
  };

export default validation;
