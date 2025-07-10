import { IsInt, IsPositive, Min, IsNotEmpty } from 'class-validator';

export class CreateDetallePedidoDto {    
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    producto: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    cantidad: number;
}
