import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TaskModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
