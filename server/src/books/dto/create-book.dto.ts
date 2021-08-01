import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Author } from "../entities/author.entity";

export class CreateBookDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    page: number;

    @IsNumber()
    @ApiProperty()
    authorId: number;

    @IsNumber()
    @ApiProperty()
    typeId: number;
}