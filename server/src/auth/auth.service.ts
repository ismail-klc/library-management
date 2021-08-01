import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto) {
    // check email is already registered
    const existedUser = await this.authRepository.findOne({ email: signInDto.email });
    if (!existedUser) {
      throw new BadRequestException('Wrong password or email');
    }

    // compare passwords
    if (!await bcrypt.compare(signInDto.password, existedUser.password)) {
      throw new BadRequestException('Wrong password or email');
    }

    // return signed jwt token
    return await this.jwtService.signAsync({ id: existedUser.id, email: existedUser.email });
  }

  async signUp(signUpDto: SignUpDto) {
    // check email is already registered
    const existedUser = await this.authRepository.findOne({ email: signUpDto.email });
    if (existedUser) {
      throw new BadRequestException('This email is already registered');
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

}
