import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';

export class CreateEventoDto {
  @Length(4, 64)
  nombre: string;

  @Length(4, 64)
  ubicacion: string;

  @IsDateString()
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @IsMongoId()
  categoriaId: string;
}
