import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;
}
