import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name :'user' })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'username', unique: true })
    username: string;
    
    @Column()
    email: string;

    @Column()
    login42: string;

    @Column()
    image_url: string;

    @Column()
    displayName: string;
}
