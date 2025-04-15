import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { stat } from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500; // Par défaut, erreur serveur interne
    let errorMessage: any = { message: 'Internal server error' };

    if (exception instanceof HttpException) {
      // Gestion des erreurs HTTP
      status = exception.getStatus();
      errorMessage = exception.getResponse();
    } else if (exception instanceof Error) {
      // Gestion des autres erreurs JavaScript
      errorMessage = {
        message: exception.message,
        stack: process.env.NODE_ENV === 'development' ? exception.stack : null,
      };
    }
    // Logging détaillé
    this.logger.error(
      `HTTP Status: ${status} | Method: ${request.method} | URL: ${request.url} | Error: ${JSON.stringify(errorMessage)}`,
    );

    // Réponse HTTP
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage.message,
      details: errorMessage.details || null,
    });
  }
}
