import { IsDateString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePagoDto {
    @IsNotEmpty()
    @IsDateString()
    fecha: Date;

    @IsNotEmpty()
    @IsPositive()
    total: number;

    @IsNotEmpty()
    estado: string;
    
    @IsNotEmpty()
    mercadoPago: string;
}
