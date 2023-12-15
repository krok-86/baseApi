import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    fullName: string

    @Column({
        unique: true,
    })
    email: string

    @Column()
    dob: number

    @Column()
    password: string

}
