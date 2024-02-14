import AppDataSource from "./data-source";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import userRoutes from "./routes/user.routes";

import { Book } from "./entity/Book.entity";
import bookRoutes from "./routes/book.routes";

// type BookType = {
//   id: number;
//   title: string;
//   description: string;
//   picture: string;
//   rating: number;
//   dateOfIssue: Date;
// }

AppDataSource.initialize()
  .then(async () => {

    const book = new Book
book.title = "Fantasy World: The Land of Magic"
book.description = "A thrilling detective story about a missing necklace"
book.picture = "mystery-necklace.jpg"
book.rating  = 3
book.price = 2300
book.dateOfIssue = null
book.authorId = null
book.genreId = null

await AppDataSource.manager.save(book)
console.log("Book has been saved. Book id is", book.id)

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/users", cors(), userRoutes);
    app.use("/books", cors(), bookRoutes);
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
