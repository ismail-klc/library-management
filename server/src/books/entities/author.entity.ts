import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity('authors')
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];
}
