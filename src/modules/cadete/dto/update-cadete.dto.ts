import { PartialType } from '@nestjs/mapped-types';
import { CreateCadeteDto } from './create-cadete.dto';

export class UpdateCadeteDto extends PartialType(CreateCadeteDto) {}
