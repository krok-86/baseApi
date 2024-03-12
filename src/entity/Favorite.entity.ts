import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, CreateDateColumn, ManyToMany } from "typeorm"

import { User } from "./User.entity";
import { Book } from "./Book.entity";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    User: User

    @ManyToOne(() => Book, (book) => book.favorite)
    books: Book[]
}