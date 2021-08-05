import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ChangePasswordDto } from './dto/change-password.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    @InjectQueue('mail') private readonly mailQueue: Queue
  ) { }

  async signIn(signInDto: SignInDto) {
    // check email is already registered
    const existedUser = await this.authRepository.findOne({ email: signInDto.email });
    if (!existedUser) {
      throw new BadRequestException(['Wrong password or email']);
    }

    // compare passwords
    if (!await bcrypt.compare(signInDto.password, existedUser.password)) {
      throw new BadRequestException(['Wrong password or email']);
    }

    // return signed jwt token
    return await this.jwtService.signAsync({ id: existedUser.id, email: existedUser.email });
  }

  async signUp(signUpDto: SignUpDto) {
    // check email is already registered
    const existedUser = await this.authRepository.findOne({ email: signUpDto.email });
    if (existedUser) {
      throw new BadRequestException(['This email is already registered']);
    }

    // hash password and save
    const hashedPassword = await bcrypt.hash(signUpDto.password, 12);
    const newUser = await this.authRepository.save({
      email: signUpDto.email,
      name: signUpDto.fullName,
      password: hashedPassword
    });

    delete newUser.password;

    // sign jwt token and return it with newUser
    const jwt = await this.jwtService.signAsync({ id: newUser.id, email: newUser.email });
    return { newUser, jwt };
  }

  async getUser(token: string) {
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.authRepository.findOne({ id: data.id });
    return user;
  }

  async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
    const data = await this.jwtService.verifyAsync(token);
    const user = await this.authRepository.findOne({ id: data.id });
    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    if (!await bcrypt.compare(changePasswordDto.oldPassword, user.password)) {
      throw new BadRequestException(['Wrong old password']);
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
    user.password = hashedPassword;

    return this.authRepository.save(user);
  }

  // send email to reset password
  async sendResetEmail(email: string) {
    const user = await this.authRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    this.mailQueue.add('reset-password', {
      code: verifyCode, email: user.email
    });
    user.code = verifyCode;

    return this.authRepository.save(user);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto){
    const user = await this.authRepository.findOne({ email: resetPasswordDto.email });
    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    if (user.code != resetPasswordDto.code) {
        throw new BadRequestException(['Wrong code']);
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, 12);
    user.password = hashedPassword;

    return this.authRepository.save(user);
  }

  async confirmCode(code: number, email: string){
    const user = await this.authRepository.findOne({ email });  
    if (!user) {
      throw new NotFoundException(['User not found']);
    }

    console.log(typeof user.code,typeof code);
    
    if (user.code != code) {
        throw new BadRequestException(['Wrong code']);
    }

    return user;
  }

}
