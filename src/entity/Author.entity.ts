
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Book } from "./Book.entity"

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: string

    @Column({length: 100,})
    name: string

    @OneToMany(() => Book, (book) => book.)
    books: Book[]
}