import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Repository } from 'typeorm';
import { EventoService } from 'src/evento/evento.service';
import { Evento } from 'src/evento/entities/evento.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class PublicacionService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
    private readonly eventoService: EventoService,
  ) {}
  async create(createPublicacionDto: CreatePublicacionDto) {
    console.log('createDto:', createPublicacionDto);
    const evento = await this.eventoService.findOne(
      createPublicacionDto.eventoId,
    );
    console.log('publicacion evento:', evento);
    const newPublicacion = this.publicacionRepository.create({
      ...createPublicacionDto,
      eventoId: evento._id,
    });
    console.log('publicacionToSave:', newPublicacion);
    await this.publicacionRepository.save(newPublicacion);
    return this.publicacionWithEvento(newPublicacion, evento);
  }
  async publicacionWithEvento(publicacion: Publicacion, evento?: Evento) {
    const { eventoId, ...publicacionNoEvento } = publicacion;
    const _evento = evento
      ? await this.eventoService.eventoWithCategoria(evento)
      : await this.eventoService.findOneWithCategoria(eventoId.toString());
    return { ...publicacionNoEvento, _evento };
  }

  async findAll() {
    const publicaciones = await this.publicacionRepository.find();
    const publicacionesWithEvento = [];
    for (const publicacion of publicaciones) {
      publicacionesWithEvento.push(
        await this.publicacionWithEvento(publicacion),
      );
    }
    return publicacionesWithEvento;
  }

  async findOne(id: string) {
    const publicaion = await this.publicacionRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!publicaion) {
      throw new NotFoundException(`Publicacion with id: ${id} not found.`);
    }
    return publicaion;
  }

  async findOneWithEvento(id: string) {
    const publicacion = await this.findOne(id);
    return this.publicacionWithEvento(publicacion);
  }

  async update(id: string, publicacionUpdate: Partial<CreatePublicacionDto>) {
    const { eventoId, ..._publicacion } = publicacionUpdate;
    const publicacion = await this.findOne(id);
    const evento = await this.eventoService.findOne(
      eventoId ?? publicacion._id.toString(),
    );
    if (eventoId) publicacion.eventoId = new ObjectId(eventoId);
    Object.assign(publicacion, _publicacion);
    this.publicacionRepository.save(publicacion);
    return this.publicacionWithEvento(publicacion, evento);
  }

  async remove(id: string) {
    return this.publicacionRepository.delete(id);
  }
}
