import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { MorganMiddleware } from '../middlewares/morgan.middleware';

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
