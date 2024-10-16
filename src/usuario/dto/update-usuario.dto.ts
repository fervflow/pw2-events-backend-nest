import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUsuarioDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
