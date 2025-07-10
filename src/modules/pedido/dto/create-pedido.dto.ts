import { IsInt, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreatePedidoDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  cliente?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  cadete?: number;

  @IsOptional()
  @IsPositive()
  total?: number;

  @IsOptional()
  estado?: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
