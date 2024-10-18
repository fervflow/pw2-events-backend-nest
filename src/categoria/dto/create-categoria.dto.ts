import { Length } from 'class-validator';

export class CreateCategoriaDto {
  @Length(3, 15)
  nombre: string;
}
