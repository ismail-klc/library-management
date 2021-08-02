import {
    Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, Param, Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FindOneParams } from 'src/core/find-one.param';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@ApiTags('borrows')
@Controller('borrows')
@UseGuards(AuthGuard)
export class BorrowController {
    constructor(private readonly borrowService: BorrowService) { }

    @Post()
    @HttpCode(201)
    createBorrow(@Body() createBorrowDto: CreateBorrowDto) {
        return this.borrowService.createBorrow(createBorrowDto);
    }

    @Get()
    @HttpCode(200)
    getBorrows() {
        return this.borrowService.getBorrows();
    }

    @Put('complete/:id')
    @HttpCode(200)
    completeBorrow(@Param() id: FindOneParams) {
        return this.borrowService.completeBorrow(id);
    }
}
