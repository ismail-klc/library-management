import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: '',
      password: '',
      database: 'LibraryDb',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
