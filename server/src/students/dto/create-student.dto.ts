import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { Gender } from "../entities/student.entity";

export class CreateStudentDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsDateString()
    birthDate: Date;

    @IsNumberString()
    schoolNumber: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsNotEmpty()
    class: string;
}