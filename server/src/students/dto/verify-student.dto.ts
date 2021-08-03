import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber, IsNumberString } from "class-validator";

export class VerifyStudentDto {
    @IsNumberString()
    @ApiProperty()
    id: number;

    @IsNumber()
    @ApiProperty()
    code: number;
}