import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { CoreModule } from './core/core.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    StudentsModule,
    CoreModule,
    BooksModule,
    BorrowModule,
  ],
})
export class AppModule { }
