import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, MinLength  } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class ConfirmResetDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @Length(6)
    @ApiProperty()
    code: number;
}