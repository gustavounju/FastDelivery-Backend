// src/auth/guards/jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    console.log('🔒 Verificando autenticación JWT...');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('❌ Acceso denegado - Token inválido o no presente');
      throw err || new Error('No autorizado');
    }
    console.log('✅ Acceso permitido para admin:', user.username);
    return user;
  }
}