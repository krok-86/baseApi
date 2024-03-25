import AppDataSource from "./data-source";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as cors from "cors";
import userRoutes from "./routes/user.routes";

import { Book } from "./entity/Book.entity";
import bookRoutes from "./routes/book.routes";
import genreRoutes from "./routes/genre.routes";
import postRoutes from "./routes/post.routes";
import cartRoutes from "./routes/cart.routes";

AppDataSource.initialize()
  .then(async () => {
    console.log("Here you can setup and run express / fastify / any other framework.");
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/users", cors(), userRoutes);
    app.use("/books", cors(), bookRoutes);
    app.use("/posts", cors(), postRoutes);
    app.use("/genres", cors(), genreRoutes);
    app.use("/cart", cors(), cartRoutes);
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
    });
  })
  .catch((error) => console.log(error));
