import AppDataSource from "./data-source";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import userRoutes from "./routes/user.routes";

import { Book } from "./entity/Book.entity";



AppDataSource.initialize()
  .then(async () => {

    const book = new Book()
book.title = "Me and Bears"
book.description = "I am near polar bears"
book.picture = "photo-with-bears.jpg"
book.rating  = 1
book.dateOfIssue = "1212/12/12"

await AppDataSource.manager.save(book)
console.log("Book has been saved. Book id is", book.id)

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/users", cors(), userRoutes);
    app.use(express.static("uploads"));

    app.use(
      (
        error: { message: string; status: number; stack?: string },
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        console.log(error);
        res.status(error.status || 500);
        const message =
          error.message || "Something went wrong on the server side";
        res.json({ status: error.status, message, stack: error.stack });
        console.log("Error status: ", error.status);
        console.log("Message :", message);
      }
    );

    app.listen({ port: 3003 }, async () => {
      console.log("Server up on http://localhost:3003");
      try {
        console.log("Database Connected!");
      } catch (err) {
        console.error(">>>>>Unable to connect to the database:", err);
      }
    });
  })
  .catch((error) => console.log(error));
