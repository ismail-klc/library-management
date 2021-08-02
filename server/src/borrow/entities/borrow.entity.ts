import { Book } from 'src/books/entities/book.entity';
import { Student } from 'src/students/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('borrows')
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Student, student => student.borrows)
    student: Student;

    @ManyToOne(type => Book, book => book.borrows)
    book: Book;

    @Column()
    takenDate: Date;

    @Column()
    broughtDate: Date;

    @Column({ default: false })
    isCompleted: boolean;
}
