import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumberString } from "class-validator";
import { Gender } from "../entities/student.entity";

export class CreateStudentDto {
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsDateString()
    @ApiProperty()
    birthDate: Date;

    @IsNumberString()
    @ApiProperty()
    schoolNumber: string;

    @IsEnum(Gender)
    @ApiProperty({ enum: Gender })
    gender: Gender;

    @IsNotEmpty()
    @ApiProperty()
    class: string;
}