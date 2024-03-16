import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCrudModule } from './test-crud/test-crud.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { configDotenv } from 'dotenv';

configDotenv()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:  process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      entities: [User],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    TestCrudModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
