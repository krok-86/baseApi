import "reflect-metadata"
import { DataSource } from "typeorm"
// import {User} from "./entity/User.entity"

  const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "testuser",
    password: "123456",
    database: "baseApidb",
    synchronize: false,
    logging: false,
    // entities: [User],
    entities: ['src/entity/*{.ts,.js}'],
    migrations: ["src/migration/*{.ts,.js}"],
    subscribers: [/*...*/],
})

   export default AppDataSource;
