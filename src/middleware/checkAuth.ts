import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: string = (req.headers.authorization || '').replace(/Bearer\s?/,'');
  if (token) {
  try {
    const decoded = jwt.verify(token, 'secret123') as jwt.JwtPayload
    req.body.userUniqId = decoded._id;
    next();
  } catch (e) {
  res.status(403).json(e);
  }
  } else {
    res.status(403).json({
       message: 'not access allowed'
    })
  }
  }