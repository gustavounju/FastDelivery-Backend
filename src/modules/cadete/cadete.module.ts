import { Module } from '@nestjs/common';
import { CadeteService } from './cadete.service';
import { CadeteController } from './cadete.controller';
import { Cadete } from 'src/entities/cadete.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cadete])],
  controllers: [CadeteController],
  providers: [CadeteService],
  exports: [CadeteService]
})
export class CadeteModule {}
