import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneParams } from 'src/core/find-one.param';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) { }

    getStudents() {
        return this.studentRepository.find();
    }

    createStudent(createStudentDto: CreateStudentDto) {
        return this.studentRepository.save(createStudentDto);
    }

    async getById(params: FindOneParams) {
        const student = await this.studentRepository.findOne({ id: params.id });
        if(!student){
            throw new BadRequestException('student not found');
        } 

        return student;
    }
}
