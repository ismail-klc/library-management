import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from 'typeorm';
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

    @Column()
    stock: number;

    @Column()
    image: string;

    @Column()
    description: string;

    @ManyToOne(type => Author, author => author.books)
    author: Author;

    @ManyToOne(type => Type, type => type.books)
    type: Type;

    @OneToMany(type => Borrow, type => type.book)
    borrows: Borrow[];
}
