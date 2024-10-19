import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('categorias')
export class Categoria {
  @ObjectIdColumn()
  _id: ObjectId;

  // @Column({ unique: true })
  @Column()
  nombre: string;
}
