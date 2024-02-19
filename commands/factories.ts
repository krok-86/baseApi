import AppDataSource from "../src/data-source";
import { Book } from "../src/entity/Book.entity";
import { faker } from '@faker-js/faker';
AppDataSource.initialize()
  .then(async () => {

    for(let i = 0; i < 3; i++){
    const book = new Book
book.title = faker.lorem.words(2),
book.description = faker.lorem.words(10),
book.picture = "1.png" //faker.image.avatar(),
book.rating  = faker.datatype.number({min:1, max:5})
book.price = faker.datatype.number({min:10, max:1000})
book.dateOfIssue = null//faker.date.birthdate()
book.authorId = faker.datatype.number({min:1, max:3})
book.genreId = faker.datatype.number({min:1, max:3})

await AppDataSource.manager.save(book)
 }
console.log("Books has been saved. Book id is")
 process.exit();
})

// import { define } from "typeorm-seeding";
// // import * as Faker from "faker";
// import { Book } from "../entity/Book.entity";
// define(Book, (faker) => {
//     const book = new Book();
//     book.title = faker.lorem.words(8);
//     book.description = faker.lorem.words(16);
//     book.
//     // post.title = faker.lorem.words(8);
//     // post.description = faker.lorem.paragraph(6);
//     // post.isPublished = faker.random.boolean();
//     return book;
//   });