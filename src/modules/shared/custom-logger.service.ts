import { Injectable, Logger, LogLevel } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends Logger {
  log(message: string, context?: string) {
    super.log(message, context || this.context);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context || this.context);
  }

  warn(message: string, context?: string) {
    super.warn(message, context || this.context);
  }

  debug(message: string, context?: string) {
    super.debug(message, context || this.context);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context || this.context);
  }

  // Fonctionnalité supplémentaire : Ajouter des métadonnées ou exporter des logs
  customLog(message: string, metadata: Record<string, any>, context?: string) {
    const logMessage = `${message} | Metadata: ${JSON.stringify(metadata)}`;
    this.log(logMessage, context || this.context);
  }
}
