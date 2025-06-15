import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SecurityHeadersInterceptor implements NestInterceptor {
  /**
   * Interceptor para añadir cabeceras de seguridad adicionales en cada respuesta
   * Complementa la configuración de Helmet
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        // Cabeceras adicionales no configuradas por Helmet
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('X-XSS-Protection', '1; mode=block');
        response.setHeader('X-Frame-Options', 'SAMEORIGIN');

        // Anti cache para APIs sensibles
        if (this.isSensitiveRoute(request.path)) {
          response.setHeader(
            'Cache-Control',
            'no-store, no-cache, must-revalidate, proxy-revalidate',
          );
          response.setHeader('Pragma', 'no-cache');
          response.setHeader('Expires', '0');
        }
      }),
    );
  }

  private isSensitiveRoute(path: string): boolean {
    // Rutas que contienen información sensible
    const sensitivePaths = ['/api/auth', '/api/admin', '/api/instituciones'];

    return sensitivePaths.some((route) => path.includes(route));
  }
}
