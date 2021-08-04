import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BooksService } from './books.service';
import {
    Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, Param, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { Express, Request } from 'express';
import { CreateAuthorDto } from './dto/create-author.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { FindOneParams } from 'src/core/find-one.param';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

export const storage = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@ApiTags('books')
@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Get('authors')
    @HttpCode(200)
    getAuthors() {
        return this.bookService.getAuthors();
    }

    @UseInterceptors(FileInterceptor("image", storage))
    @Post('authors')
    @HttpCode(201)
    createAuthor( @UploadedFile() file: Express.Multer.File, @Body() createAuthorDto: CreateAuthorDto) {
        return this.bookService.createAuthor(createAuthorDto, file.filename);
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

    @UseInterceptors(FileInterceptor("image", storage))
    @Post()
    @HttpCode(201)
    createBook(@UploadedFile() file: Express.Multer.File, @Body() createBookDto: CreateBookDto) {
        return this.bookService.createBook(createBookDto, file.filename);
    }

    @Get()
    @HttpCode(200)
    getBooks() {
        return this.bookService.getBooks();
    }

    @Get('latests')
    @HttpCode(200)
    getLatests() {
        return this.bookService.getLastBooks();
    }

    @Get('count')
    @HttpCode(200)
    getCount() {
        return this.bookService.getCount();
    }

    @Get(':id')
    @HttpCode(200)
    getBook(@Param() id: FindOneParams) {
        return this.bookService.getBookById(id);
    }

    @Get('authors/:id')
    @HttpCode(200)
    getAuthor(@Param() id: FindOneParams) {
        return this.bookService.getAuthorById(id);
    }

    @Get('types/:id')
    @HttpCode(200)
    getType(@Param() id: FindOneParams) {
        return this.bookService.getTypeById(id);
    }
}
