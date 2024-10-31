import { IsDateString, IsMongoId } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePublicacionDto {
  @IsDateString()
  fecha_publicacion: Date;

  @Column()
  descripcion: string;

  @IsMongoId()
  eventoId: string;
}
