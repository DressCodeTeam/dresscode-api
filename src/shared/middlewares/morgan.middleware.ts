import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP'); // Logger natif de NestJS

  use(req: any, res: any, next: () => void) {
    morgan(
      (tokens, req, res) => {
        return [
          `[${tokens.date(req, res)}]`,
          `Method: ${tokens.method(req, res)}`,
          `URL: ${tokens.url(req, res)}`,
          `Status: ${tokens.status(req, res)}`,
          `- Response Time: ${tokens['response-time'](req, res)} ms`,
        ].join(' | ');
      },
      {
        stream: {
          write: (message: string) => {
            this.logger.log(message.trim());
          },
        },
      },
    )(req, res, next);
  }
}
