import { IsDateString, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreatePagoDto {
    @IsOptional()
    @IsPositive()
    total: number;

    @IsOptional()
    estado: string;

    @IsNotEmpty()
    pedido: number
}
