import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ObjectId } from 'typeorm';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() usuario: CreateUsuarioDto) {
    return this.usuarioService.create(usuario);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() usuario: Partial<Usuario>) {
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.usuarioService.remove(id);
  }
}
