import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('eventos')
export class Evento {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column()
  fecha: Date;

  @Column('decimal')
  precio: number;

  @Column()
  categoriaId: ObjectId;

  // @ManyToOne(() => Categoria, (categoria) => categoria._id)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @Column((type) => Categoria)
  // categoria: Categoria;
}
