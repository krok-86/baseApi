import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token: string = (req.headers.authorization || '').replace(/Bearer\s?/,'');//delete Bearer token
    console.log(">>>>>>",token)
  if (token) {
  try {
    const decoded: any = jwt.verify(token, 'secret123')
    console.log(">>>>>>", decoded)
    req.body.user.id = { id: decoded.id };
    console.log(">>>>>>", req.body)
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