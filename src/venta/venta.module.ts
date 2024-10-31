import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { EventoModule } from 'src/evento/evento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]),
    UsuarioModule,
    EventoModule,
    ClienteModule,
  ],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [VentaService],
})
export class VentaModule {}
