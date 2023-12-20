import { AppDataSource } from "./data-source"
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import * as BodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import { CustomError } from "./error";



AppDataSource.initialize().then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.fullName = "Timber"
    // user.email = "8700478@mail.ru"
    // user.dob = 25
    // user.password= "123456"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

    const app = express();
    app.use(express.json());
    app.use(cors())
    app.use(BodyParser.json());

    app.use("/", cors(),  userRoutes);

    app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof CustomError) {
      res.status(error.status || 500);
  const message = error.message || "Something went wrong on the server side";
  res.json({ status: error.status, message, stack: error.stack });
  console.log("Error status: ", error.status);
  console.log("Message :", message);
      }
    })

app.listen({ port: 3003 }, async () => {
    console.log("Server up on http://localhost:3003");
    try {
      //await sequelize.authenticate();
      //authenticate();??
      console.log("Database Connected!");
    } catch (err) {
      console.error(">>>>>Unable to connect to the database:", err);
    }
  });

}).catch(error => console.log(error))