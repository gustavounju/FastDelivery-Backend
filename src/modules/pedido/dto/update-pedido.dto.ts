import { IsOptional, IsNumber, IsDate, IsString, IsPositive } from 'class-validator';

export class UpdatePedidoDto {
  @IsOptional()
  @IsNumber()
  producto?: number;

  @IsOptional()
  @IsNumber()
  cliente?: number;

  @IsOptional()
  @IsNumber()
  cadete?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cantidad?: number;

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
