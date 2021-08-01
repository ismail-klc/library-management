import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneParams } from 'src/core/find-one.param';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { Type } from './entities/type.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
        @InjectRepository(Type)
        private typeRepository: Repository<Type>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    createAuthor(createAuthorDto: CreateAuthorDto) {
        return this.authorRepository.save(createAuthorDto);
    }

    getAuthors() {
        return this.authorRepository.find({ relations: ['books'] });
    }

    createType(createTypeDto: CreateTypeDto) {
        return this.typeRepository.save(createTypeDto);
    }

    getTypes() {
        return this.typeRepository.find({ relations: ['books'] });
    }

    async createBook(createBookDto: CreateBookDto) {
        const author = await this.authorRepository.findOne({ id: createBookDto.authorId });
        const type = await this.typeRepository.findOne({ id: createBookDto.typeId });
        if (!author || !type) {
            throw new BadRequestException('Wrong author or type');
        }

        return this.bookRepository.save({
            author, type,
            name: createBookDto.name,
            page: createBookDto.page
        });
    }

    getBooks() {
        return this.bookRepository.find({ relations: ['author', 'type'] });
    }

    getBookById(params: FindOneParams) {
        return this.bookRepository.findOne(params.id, { relations: ['author', 'type'] });
    }
}
