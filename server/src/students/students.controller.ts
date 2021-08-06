import {
    Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FindOneParams } from 'src/core/find-one.param';
import { CreateStudentDto } from './dto/create-student.dto';
import { VerifyStudentDto } from './dto/verify-student.dto';
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

    @Get('count')
    @HttpCode(200)
    getCount() {
        return this.studentService.getCount();
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

    @Post('activate/:id')
    toggleActivateStudent(@Param() id: FindOneParams){
        return this.studentService.activateStudent(id);
    }

    @Post('verify')
    @HttpCode(200)
    verifyStudent( @Body() verifyStudentDto: VerifyStudentDto) {
        return this.studentService.verifyStudent(verifyStudentDto);
    }


}
