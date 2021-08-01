import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTypeDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}