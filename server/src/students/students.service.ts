import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { FindOneParams } from 'src/core/find-one.param';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectQueue('mail') private readonly mailQueue: Queue
    ) { }

    getStudents() {
        return this.studentRepository.find();
    }

    async createStudent(createStudentDto: CreateStudentDto) {
        const student = await this.studentRepository.findOne({ email: createStudentDto.email });
        if (student) {
            throw new BadRequestException('This email is already registered');
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        this.mailQueue.add('confirmation', {
            code: verifyCode, email: createStudentDto.email
        });
        createStudentDto.verifyCode = verifyCode;

        return this.studentRepository.save(createStudentDto);
    }

    async getById(params: FindOneParams) {
        const student = await this.studentRepository.findOne({ id: params.id });
        if (!student) {
            throw new BadRequestException(['student not found']);
        }

        return student;
    }
}
