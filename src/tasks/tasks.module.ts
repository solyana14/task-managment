import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/auth/user/user.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    UserModule
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
