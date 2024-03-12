import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm"
import { CartBook } from "./CartBook.entity"
import { User } from "./User.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    User: User

    @OneToMany(() => CartBook, (cartBook) => cartBook.cart)
    cartBooks: CartBook[]
}