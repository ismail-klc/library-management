import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import { StudentsModule } from 'src/students/students.module';
import { BorrowController } from './borrow.controller';
import { BorrowService } from './borrow.service';
import { Borrow } from './entities/borrow.entity';

@Module({
  imports: [
    BooksModule,
    StudentsModule,
    TypeOrmModule.forFeature([Borrow])
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService]
})
export class BorrowModule {}
