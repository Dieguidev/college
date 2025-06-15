import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request } from 'express';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  /**
   * Guard personalizado para Rate Limiting que solo actúa en endpoints críticos
   * como autenticación o operaciones sensibles
   */
  protected async getTracker(req: Request): Promise<string> {
    // Usamos la IP como identificador. En producción, puedes usar X-Forwarded-For
    const ip = req.ip || 'unknown';
    return ip;
  }

  protected async shouldThrottle(req: Request): Promise<boolean> {
    // Lista de rutas críticas que queremos limitar
    const criticalPaths = [
      '/api/auth/login',
      '/api/auth/create-staff',
      '/api/auth/create-student',
    ];

    // Solo aplicar límites a rutas críticas
    const requestPath = req.path;
    const isCriticalPath = criticalPaths.some((path) =>
      requestPath.includes(path),
    );

    return isCriticalPath;
  }
}
