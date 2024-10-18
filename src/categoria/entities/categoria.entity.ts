import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @ObjectIdColumn()
  _id: string | ObjectId;

  @Column({ unique: true })
  nombre: string;
}
