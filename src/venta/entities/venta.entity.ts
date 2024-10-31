import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('ventas')
export class Venta {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fecha_venta: Date;

  @Column()
  usuarioId: ObjectId;

  @Column()
  eventoId: ObjectId;

  @Column()
  clienteId: ObjectId;
}
