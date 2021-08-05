import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length, MinLength  } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class ResetPasswordDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @Length(6)
    @ApiProperty()
    code: number;

    @MinLength(6)
    @ApiProperty()
    password: string;

    @MinLength(6)
    @Match('password')
    @ApiProperty()
    passwordConfirm: string;
}