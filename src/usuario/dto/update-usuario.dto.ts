import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
