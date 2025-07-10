import { IsNotEmpty } from 'class-validator';

export class CreateCadeteDto {
    @IsNotEmpty()
    nombre: string;
}
