import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Author } from './author.entity';
import { Type } from './type.entity';

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    page: number;

    @ManyToOne(type => Author, author => author.books)
    author: Author;

    @ManyToOne(type => Type, type => type.books)
    type: Type;
}
