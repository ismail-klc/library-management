import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    MailModule
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService, TypeOrmModule]
})
export class StudentsModule { }
