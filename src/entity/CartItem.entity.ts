import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Book } from "./Book.entity"
import { Cart } from "./Cart.entity"

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    countBook: number

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart

    @ManyToOne(() => Book, (book) => book.cartItems)
    book: Book
  }