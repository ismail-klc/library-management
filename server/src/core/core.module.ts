import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: '6h' }
        }),
        MulterModule.register({
            dest: './uploads'
          }),
    ],
    exports: [JwtModule, MulterModule]
})
export class CoreModule { }
