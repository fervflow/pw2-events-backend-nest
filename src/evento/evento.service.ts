import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './entities/evento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
  async create(createEventoDto: CreateEventoDto) {
    const categoria = await this.categoriaRepository.findOneBy({
      _id: new ObjectId(createEventoDto.categoriaId),
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria: ${createEventoDto.categoriaId} not found`,
      );
    }

    const newEvento = this.eventoRepository.create({
      ...createEventoDto,
      categoria,
    });
    return this.eventoRepository.save(newEvento);
  }

  async findAll() {
    return this.eventoRepository.find();
  }

  async findOne(id: string) {
    const evento = await this.eventoRepository.findOneBy({ _id: id });
    if (!evento) {
      throw new NotFoundException(`Evento with id: ${id} not found.`);
    }
    return this.eventoRepository.save(evento);
  }

  async update(id: string, evento: Partial<CreateEventoDto>) {
    const eventoUpdate = await this.eventoRepository.preload({
      _id: new ObjectId(id),
      ...evento,
    });
    if (!eventoUpdate) {
      throw new NotFoundException(`Evento with id: ${id} not found.`);
    }
    if (evento.categoriaId) {
      const categoria = await this.categoriaRepository.findOneBy({
        _id: new ObjectId(id),
      });
      if (!categoria) {
        throw new NotFoundException(
          `Categoria with id: ${evento.categoriaId} not found.`,
        );
      }
      eventoUpdate.categoria = categoria;
    }
    return this.eventoRepository.save(eventoUpdate);
  }

  async remove(id: string) {
    return this.eventoRepository.delete(id);
  }
}
