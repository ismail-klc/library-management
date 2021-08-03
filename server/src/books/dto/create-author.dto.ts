import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto {
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;
}