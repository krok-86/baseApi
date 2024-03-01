import AppDataSource from "../src/data-source";
import { Author } from "../src/entity/Author.entity";
import { Book } from "../src/entity/Book.entity";
import { faker } from "@faker-js/faker";
import { Genre } from "../src/entity/Genre.entity";
import { Rating } from "../src/entity/Rating.entyty";
import { User } from "../src/entity/User.entity";
import { Post } from "../src/entity/Post.entity";
AppDataSource.initialize().then(async () => {
    for (let i = 0; i < 10; i++) {
    const author = new Author();
    (author.name = faker.lorem.words(2));
      await AppDataSource.manager.save(author);
  }
  console.log("Authors has been saved.");

  for (let i = 0; i < 10; i++) {
    const genre = new Genre();
    (genre.title = faker.lorem.words(1));
      await AppDataSource.manager.save(genre);
  }
  console.log("Genres has been saved.");

  for (let i = 0; i < 20; i++) {
    const user = new User();
    (user.fullName = faker.lorem.words(2));
      (user.email = faker.internet.email());
      (user.dob = null),
      (user.password = faker.internet.password());
      (user.avatarImg = "");
    await AppDataSource.manager.save(user);
  }
  console.log("Users has been saved.");

  for (let i = 0; i < 36; i++) {
    const book = new Book();
    (book.title = faker.lorem.words(2));
    (book.description = faker.lorem.words(10));
    (book.picture = "1.png"); //faker.image.avatar(),
    book.rating = faker.datatype.number({ min: 1.0, max: 5.0 });
    book.price = faker.datatype.number({ min: 10, max: 1000 });
    book.dateOfIssue = null; //faker.date.birthdate()
    book.authorId = faker.datatype.number({ min: 1, max: 3 });
    book.genreId = faker.datatype.number({ min: 1, max: 3 });
    await AppDataSource.manager.save(book);
  }
  console.log("Books has been saved. Book id is");

  for (let i = 0; i < 12; i++) {
    const post = new Post();
    (post.postText = faker.lorem.words(40));
    // post.created_at = faker.date.birthdate()
    (post.bookId = faker.datatype.number({ min: 1, max: 20 }));
    (post.userId = faker.datatype.number({ min: 1, max: 20 }));
    await AppDataSource.manager.save(post);
  }
  console.log("Ratings has been saved.");

  for (let i = 0; i < 12; i++) {
    const rating = new Rating();
    (rating.bookId = faker.datatype.number({ min: 1, max: 20 }));
      (rating.userId = faker.datatype.number({ min: 1, max: 20 }));
    await AppDataSource.manager.save(rating);
  }
  console.log("Ratings has been saved.");
  process.exit();
});
