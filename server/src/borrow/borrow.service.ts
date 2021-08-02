import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    ) { }

    async createBorrow(createBorrowDto: CreateBorrowDto) {
        const student = await this.studentRepository.findOne({ id: createBorrowDto.studentId });
        const book = await this.bookRepository.findOne({ id: createBorrowDto.bookId });

        if (!student || !book) {
            throw new BadRequestException(['Wrong student or book']);
        }

        return this.borrowRepository.save({
            book, student,
            takenDate: new Date().toString(),
            broughtDate: new Date(0, 0, 0).toString()
        })
    }

    getBorrows() {
        return this.borrowRepository.find({ relations: ['book', 'student'] });
    }

    async completeBorrow(params: FindOneParams) {
        const borrow = await this.borrowRepository.findOne({ id: params.id });
        if (!borrow) {
            throw new BadRequestException(['Borrow not found']);
        }

        borrow.broughtDate = new Date();
        borrow.isCompleted = true;
        return this.borrowRepository.save(borrow);
    }
}
