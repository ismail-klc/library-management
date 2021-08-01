import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BooksService } from './books.service';
import {
    Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { FindOneParams } from 'src/core/find-one.param';

@ApiTags('books')
@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Get('authors')
    @HttpCode(200)
    getAuthors(@Req() req: Request) {
        return this.bookService.getAuthors();
    }

    @Post('authors')
    @HttpCode(201)
    createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
        return this.bookService.createAuthor(createAuthorDto);
    }

    @Get('types')
    @HttpCode(200)
    getTypes(@Req() req: Request) {
        return this.bookService.getTypes();
    }

    @Post('types')
    @HttpCode(201)
    createType(@Body() createTypeDto: CreateTypeDto) {
        return this.bookService.createType(createTypeDto);
    }

    @Post()
    @HttpCode(201)
    createBook(@Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto);
    }

    @Get()
    @HttpCode(200)
    getBooks() {
        return this.bookService.getBooks();
    }

    @Get(':id')
    @HttpCode(200)
    getBook(@Param() id: FindOneParams) {
        return this.bookService.getBookById(id);
    }
}
