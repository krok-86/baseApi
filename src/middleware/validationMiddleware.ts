import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

const validation =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body;

    try {
      await schema.validate(body);
      next();
    } catch (err: any) {
      (err.message = err.errors[0]),
      (err.status = 400);
      next(err);
    }
  };

export default validation;
