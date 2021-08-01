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
    const existedUser = await this.authRepository.findOne({ email: signInDto.email });

    if (!existedUser) {
      throw new BadRequestException('Wrong password or email');
    }

    if (!await bcrypt.compare(signInDto.password, existedUser.password)) {
      throw new BadRequestException('Wrong password or email');
    }

    return await this.jwtService.signAsync({ id: existedUser.id, email: existedUser.email });
  }

  async signUp(signUpDto: SignUpDto) {
    const existedUser = await this.authRepository.findOne({ email: signUpDto.email });

    if (existedUser) {
      throw new BadRequestException('This email is already registered');
    }


    const hashedPassword = await bcrypt.hash(signUpDto.password, 12);
    const newUser = await this.authRepository.save({
      email: signUpDto.email,
      name: signUpDto.fullName,
      password: hashedPassword
    });

    delete newUser.password;

    const jwt = await this.jwtService.signAsync({ id: newUser.id, email: existedUser.email });

    return { newUser, jwt };
  }

  getById() {

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
