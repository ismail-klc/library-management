import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBorrowDto {
    @IsNumber()
    @ApiProperty()
    studentId: number;

    @IsNumber()
    @ApiProperty()
    bookId: number;
}