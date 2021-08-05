import { ApiProperty } from "@nestjs/swagger";
import { MinLength  } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class ChangePasswordDto {
    @MinLength(6)
    @ApiProperty()
    oldPassword: string;

    @MinLength(6)
    @ApiProperty()
    newPassword: string;

    @MinLength(6)
    @Match('newPassword')
    @ApiProperty()
    newPasswordConfirm: string;
}