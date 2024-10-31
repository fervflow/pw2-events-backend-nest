import { IsDateString, IsMongoId } from 'class-validator';

export class CreateVentaDto {
  @IsDateString()
  fecha_venta: Date;

  @IsMongoId()
  usuarioId: string;

  @IsMongoId()
  eventoId: string;

  @IsMongoId()
  clienteId: string;
}
