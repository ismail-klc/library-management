import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: '6h' }
        }),
    ],
    exports: [JwtModule]
})
export class CoreModule { }
