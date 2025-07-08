import { IsInt, IsPositive, IsDateString, IsString, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  producto: number;
  
  @IsOptional()
  @IsInt()
  @IsPositive()
  cliente?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  cadete?: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsPositive()
  total?: number;

  @IsOptional()
  estado?: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
