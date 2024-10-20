import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('publicaciones')
export class Publicacion {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  fecha_publicacion: Date;

  @Column()
  eventoId: ObjectId;
}
