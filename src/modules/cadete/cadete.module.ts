import { Module } from '@nestjs/common';
import { CadeteService } from './cadete.service';
import { CadeteController } from './cadete.controller';

@Module({
  controllers: [CadeteController],
  providers: [CadeteService],
})
export class CadeteModule {}
