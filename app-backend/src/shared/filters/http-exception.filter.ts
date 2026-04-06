import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Erro interno. Tente novamente.';
    let feedbackType = 'SERVER_ERROR';

    let plate = '';
    let reason: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp['message'] as string | string[]) ?? message;
        feedbackType =
          (resp['feedbackType'] as string) ?? this.inferFeedbackType(status);
        plate = (resp['plate'] as string) ?? '';
        reason = resp['reason'] as string | undefined;
      } else if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    } else {
      this.logger.error('Unhandled exception', exception);
    }

    const displayMessage = Array.isArray(message) ? message[0] : message;

    response.status(status).json({
      feedbackType,
      allowed: false,
      plate,
      message: displayMessage,
      reason,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }

  private inferFeedbackType(status: number): string {
    if (status === Number(HttpStatus.BAD_REQUEST)) return 'INVALID_PLATE';
    if (status === Number(HttpStatus.FORBIDDEN)) return 'DENIED';
    if (status === Number(HttpStatus.NOT_FOUND)) return 'NOT_FOUND';
    return 'SERVER_ERROR';
  }
}
