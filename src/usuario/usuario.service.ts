import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
// import { v4 as uuidv4 } from 'uuid';

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
    // if (!user.id) {
    //   user.id = uuidv4();
    // }
    // const user = this.usuarioRepository.create({
    //   id: usuario.id ?? uuidv4(),
    //   ...usuario,
    // });
    console.log('FROM USUARIO SERVICE:');
    // console.log('usuarioDto:', usuario);
    console.log('user:', savedUser);
    // return this.usuarioRepository.save(savedUser);
    // return {
    //   ...savedUser,
    //   _id: (savedUser._id as ObjectId).toString(),
    // };
    return savedUser;
  }

  async findOne(id: ObjectId): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ _id: id });
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
