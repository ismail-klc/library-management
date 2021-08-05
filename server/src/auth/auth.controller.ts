import { Controller, Get, Post, Body, HttpCode, Res, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Response, Request } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendResetDto } from './dto/send-reset.dto';
import { ConfirmResetDto } from './dto/confirm-reset.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.signIn(signInDto);
    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      msg: 'success'
    }
  }

  @Post('change-password')
  @HttpCode(200)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: Request) {
    const token = req.cookies.jwt;

    return this.authService.changePassword(token, changePasswordDto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle(2, 60 * 60 * 24)
  @Post('send-reset')
  @HttpCode(200)
  async sendResetEmail(@Body() params: SendResetDto) {
    return this.authService.sendResetEmail(params.email);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle(2, 60 * 60 * 24)
  @Post('confirm-reset')
  @HttpCode(200)
  async confirmCode(@Body() params: ConfirmResetDto) {
    return this.authService.confirmCode(params.code, params.email);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle(2, 60 * 60 * 24)
  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: Response) {
    const { newUser, jwt } = await this.authService.signUp(signUpDto);
    res.cookie('jwt', jwt, { httpOnly: true });

    return newUser;
  }

  @Post('signout')
  @HttpCode(200)
  signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return {
      msg: 'success'
    }
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  currentUser(@Req() req: Request) {
    const token = req.cookies.jwt;

    return this.authService.getUser(token);
  }
}
