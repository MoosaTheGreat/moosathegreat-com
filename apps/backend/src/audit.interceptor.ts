import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, ip, method, path } = request;
    const action = `${method} ${path}`;

    return next.handle().pipe(
      tap(() => {
        if (user && user.role === 'ADMIN') {
          this.auditService.log(user.id, action, ip, { body: request.body });
        }
      }),
    );
  }
}