import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Book } from 'src/books/entities/book.entity';
import { FindOneParams } from 'src/core/find-one.param';
import { Student } from 'src/students/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { Borrow } from './entities/borrow.entity';

@Injectable()
export class BorrowService {
    constructor(
        @InjectRepository(Borrow)
        private borrowRepository: Repository<Borrow>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectQueue('mail') private readonly mailQueue: Queue
    ) { }


    // function that creates a borrow operation
    async createBorrow(createBorrowDto: CreateBorrowDto) {
        // check if the student and the book is existed
        const student = await this.studentRepository.findOne({ id: createBorrowDto.studentId });
        const book = await this.bookRepository.findOne({ id: createBorrowDto.bookId });
        if (!student || !book) {
            throw new BadRequestException(['Wrong student or book']);
        }

        // check if student is active and verified
        if (!student.isActive || !student.isVerified) {
            throw new BadRequestException(['Student account is not verified or not active']);
        }

        // check if the book has already borrowed by the student
        const isBorrowed = await this.borrowRepository.findOne({ student, book });
        if (isBorrowed) {
            throw new BadRequestException(['The student has already borrowed this book']);
        }

        // check if stock is greater than 0
        if (book.stock < 1) {
            throw new BadRequestException(['No stock for this book']);
        }

        // add infos to queue to send email
        const date = new Date().toString()
        this.mailQueue.add('borrow-info', {
            email: student.email, date, book: book.name
        });

        // decrement the value of stock
        book.stock = book.stock - 1;
        await this.bookRepository.save(book);

        // create instance
        return this.borrowRepository.save({
            book, student,
            takenDate: date,
            broughtDate: new Date(0, 0, 0).toString()
        })
    }

    // function that returns all borrow operations
    getBorrows() {
        return this.borrowRepository.find({ relations: ['book', 'student'] });
    }

    // function that completes the borrow operation
    // updates the brought date of borrow operation
    // and increments the stock value of the borrowed book
    async completeBorrow(params: FindOneParams) {
        // check if the borrow entity is existed
        const borrow = await this.borrowRepository.findOne(params.id, { relations: ['book'] });
        if (!borrow) {
            throw new BadRequestException(['Borrow not found']);
        }

        // increment the stock value of the broughten book
        const book = await this.bookRepository.findOne({ id: borrow.book.id });
        book.stock = book.stock + 1;
        await this.bookRepository.save(book);

        // update the fields and save
        borrow.broughtDate = new Date();
        borrow.isCompleted = true;
        return this.borrowRepository.save(borrow);
    }
}
