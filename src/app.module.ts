import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './auth/user/user.module';
import { RoleModule } from './auth/role/role.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule,
    // UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'newpass',
      host: 'localhost',
      port: 5432,
      database: 'task-managment',
      autoLoadEntities: true,
      synchronize: true //keep databse in sync

    }),
    // RoleModule,
    AuthModule,
  ],


})
export class AppModule { }
