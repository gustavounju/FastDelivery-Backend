import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class UpdateDetallePedidoDto{
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    cantidad: number;
}
