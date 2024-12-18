import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { MorganMiddleware } from './morgan.middleware';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class LoggerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*'); // Applique Morgan à toutes les routes
  }
}
