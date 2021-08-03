import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumberString()
    @ApiProperty()
    page: number;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumberString()
    @ApiProperty()
    stock: number;

    @IsNumberString()
    @ApiProperty()
    authorId: number;

    @IsNumberString()
    @ApiProperty()
    typeId: number;
}