// src/common/interceptors/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = req;
    const now = Date.now();

    this.logger.log(`➡️ ${method} ${url} | Body: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap((resBody) => {
        const time = Date.now() - now;
        this.logger.log(`⬅️ ${method} ${url} | +${time}ms`);
        this.logger.debug(`Response: ${JSON.stringify(resBody)}`);
      }),
    );
  }
}
