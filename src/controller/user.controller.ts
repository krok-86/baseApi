import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

class UserController {
  static registrationUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      dob: req.body.dob,
      password: req.body.password,
    };
    try{
    const user = userRepository.create(newUser); //await?
    const results = await userRepository.save(user);
    return res.send(results);
    } catch (err) {
        next(err)
        return;
    }
  };
  static authorizationUser = async (req: Request, res: Response) => {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  };
  static authorizationMeUser = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  };
  static getUser = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  };
  static getOneUser = async (req: Request, res: Response) => {
    const results = await userRepository.findOneBy({
      id: req.params.id,
    });
    return res.send(results);
  };
  static deleteUser = async (req: Request, res: Response) => {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  };
  static updateUser = async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({
      id: req.params.id,
    });
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  };
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
