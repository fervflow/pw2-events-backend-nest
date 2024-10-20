import { IsDateString, IsMongoId } from 'class-validator';

export class CreatePublicacionDto {
  @IsDateString()
  fecha_publicacion: Date;

  @IsMongoId()
  eventoId: string;
}
