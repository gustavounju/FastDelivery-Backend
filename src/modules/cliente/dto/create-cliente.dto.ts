import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
    @IsNotEmpty()
    dni: string;

    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    apellido: string;

    @IsNotEmpty()
    direccion: string;

    @IsNotEmpty()
    telefono: string;

    @IsEmail()
    email: string;
}
