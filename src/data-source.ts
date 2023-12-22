import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entity/User.entity"

console.log('>>>>>>>>>>>>>>>', __dirname);


 const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "testuser",
    password: "123456",
    database: "baseApidb",
    synchronize: false,
    logging: false,
    entities: ['src/entity/*{.ts,.js}'],
    migrations: ["src/migration/*{.ts,.js}"],
    subscribers: [/*...*/],
})


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    export default AppDataSource;
