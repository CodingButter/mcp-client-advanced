/**
 * Logging utilities for the Advanced MCP Client
 */

export interface Logger {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
}

export class ConsoleLogger implements Logger {
  debug(message: string, meta?: object): void {
    console.debug(`[DEBUG] ${message}`, meta || '');
  }

  info(message: string, meta?: object): void {
    console.info(`[INFO] ${message}`, meta || '');
  }

  warn(message: string, meta?: object): void {
    console.warn(`[WARN] ${message}`, meta || '');
  }

  error(message: string, meta?: object): void {
    console.error(`[ERROR] ${message}`, meta || '');
  }
}

export const defaultLogger = new ConsoleLogger();