import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepo } from './student.repository';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepo]), AuthModule],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class StudentModule {}
