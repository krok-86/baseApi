import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express";
const app = express();

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.fullName = "Timber"
    user.email = "8700478@mail.ru"
    user.dob = 25
    user.password= "123456"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))

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