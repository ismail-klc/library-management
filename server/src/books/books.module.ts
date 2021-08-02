import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Type } from './entities/type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Type, Book])
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, TypeOrmModule]
})
export class BooksModule { }
