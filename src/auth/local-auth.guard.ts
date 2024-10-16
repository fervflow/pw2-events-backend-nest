import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // Puedes agregar lógica adicional aquí si lo necesitas
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // info param omitted
    // Lanzar excepción si no hay usuario
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
