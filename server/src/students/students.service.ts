import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { FindOneParams } from 'src/core/find-one.param';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { VerifyStudentDto } from './dto/verify-student.dto';
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
        const student = await this.studentRepository.findOne(params.id, { relations: ['borrows', 'borrows.book'] });
        if (!student) {
            throw new BadRequestException(['student not found']);
        }

        return student;
    }

    async verifyStudent(verifyStudentDto: VerifyStudentDto) {
        const student = await this.studentRepository.findOne({ id: verifyStudentDto.id });
        if (!student) {
            throw new BadRequestException(['student not found']);
        }

        if (student.isVerified) {
            throw new BadRequestException(['student is already verified']);
        }

        if (student.verifyCode !== verifyStudentDto.code) {
            throw new BadRequestException(['wrong verify code']);
        }

        student.isVerified = true
        student.verifyCode = 0
        return this.studentRepository.save(student);
    }

    async getCount() {
        const studentCount = await this.studentRepository.count();
        return studentCount;
    }

    async activateStudent(params: FindOneParams){
        const student = await this.studentRepository.findOne(params.id);
        if (!student) {
            throw new BadRequestException(['student not found']);
        }

        student.isActive = !student.isActive;

        return this.studentRepository.save(student);
    }
}
