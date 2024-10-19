import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async create(usuario: CreateUsuarioDto): Promise<Usuario> {
    const savedUser = await this.usuarioRepository.save(usuario);
    console.log('FROM USUARIO SERVICE:');
    console.log('user:', savedUser);
    return savedUser;
  }

  async findOne(id: ObjectId): Promise<Usuario> {
    console.log('usuarioService\nfindOne:', id);
    return this.usuarioRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ email });
  }

  async update(id: ObjectId, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  async remove(id: ObjectId): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
