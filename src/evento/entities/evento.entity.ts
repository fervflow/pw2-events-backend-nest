import { Entity, Column, ManyToOne, ObjectIdColumn, ObjectId } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('eventos')
export class Evento {
  @ObjectIdColumn()
  _id: string | ObjectId;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column()
  fecha: Date;

  @Column('decimal')
  precio: number;

  // @ManyToOne(() => Categoria, (categoria) => categoria._id)
  @ManyToOne(() => Categoria)
  categoria: Categoria;
}
