import { IsOptional, IsNumber, IsString} from 'class-validator';

export class UpdatePedidoDto {
  @IsOptional()
  @IsNumber()
  cliente?: number;

  @IsOptional()
  @IsNumber()
  cadete?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
