import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateClienteDto {
  @Length(3, 64)
  nombres: string;

  @Length(3, 64)
  apellidos: string;

  @Length(7, 24)
  telefono: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
