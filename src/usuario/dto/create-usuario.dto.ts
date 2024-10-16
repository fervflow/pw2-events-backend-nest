import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  id?: string;

  @IsNotEmpty()
  @Length(3, 20)
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
