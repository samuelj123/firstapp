import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ProjectEntity } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProjectEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
