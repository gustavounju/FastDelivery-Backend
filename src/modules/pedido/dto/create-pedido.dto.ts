import { IsInt, IsPositive, IsDateString, IsString, Min, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  producto: number;
  
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  cliente: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  cadete: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cantidad: number;

  @IsNotEmpty()
  @IsPositive()
  total: number;

  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @IsOptional()
  estado: string;

  @IsOptional()
  @IsString()
  observacion: string;
}
