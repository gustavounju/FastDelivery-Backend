import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  precio: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsString()
  imagen_url?: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  categoria: number;

  @IsOptional()
  mercadoPagoLink: string;

  @IsOptional()
  imagen_nombre?: string;
}