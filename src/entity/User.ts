import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: "varchar",
        length: "230",
    })
    fullName: string;

    @Column({
        unique: true,
        type: "text"
    })
    email: string;

    @Column()
    dob: number

    @Column()
    password: string;

}
