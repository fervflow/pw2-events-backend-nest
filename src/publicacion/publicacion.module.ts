import { Module } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { PublicacionController } from './publicacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { Evento } from 'src/evento/entities/evento.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { EventoService } from 'src/evento/evento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacion, Evento, Categoria])],
  controllers: [PublicacionController],
  providers: [PublicacionService, EventoService],
  exports: [PublicacionService],
})
export class PublicacionModule {}
