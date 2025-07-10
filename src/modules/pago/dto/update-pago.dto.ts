import { IsNotEmpty } from 'class-validator';

export class UpdatePagoDto {
    @IsNotEmpty()
    estado: string;
}
