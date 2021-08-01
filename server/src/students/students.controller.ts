import {
    Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindOneParams } from './dto/find-one.param';
import { StudentsService } from './students.service';

@ApiTags('students')
@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
    constructor(private readonly studentService: StudentsService) { }

    @Get()
    @HttpCode(200)
    getStudents(@Req() req: Request) {
        return this.studentService.getStudents();
    }

    @Post()
    @HttpCode(201)
    createStudent(@Body() createStudentDto: CreateStudentDto) {
        return this.studentService.createStudent(createStudentDto);
    }

    @Get(':id')
    getStudentById(@Param() id: FindOneParams){
        return this.studentService.getById(id);
    }
}
