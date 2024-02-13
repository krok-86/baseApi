import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { CartBook } from "./CartBook.entity"

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    date: Date

    @Column()
    status: boolean

    @OneToMany(() => CartBook, (cartBook) => cartBook.cart)
    cartBooks: CartBook[]
}