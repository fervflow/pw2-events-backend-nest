import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { EventoModule } from './evento/evento.module';
import { PublicacionModule } from './publicacion/publicacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'marketing_events',
      // entities: [Usuario, Categoria, Evento],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // caution in prod
    }),
    AuthModule,
    UsuarioModule,
    CategoriaModule,
    EventoModule,
    PublicacionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
