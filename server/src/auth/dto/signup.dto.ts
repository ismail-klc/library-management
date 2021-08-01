import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}
