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

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp['message'] as string | string[]) ?? message;
        feedbackType = (resp['feedbackType'] as string) ?? this.inferFeedbackType(status);
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
      message: displayMessage,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }

  private inferFeedbackType(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'INVALID_PLATE';
      case HttpStatus.FORBIDDEN:
        return 'DENIED';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      default:
        return 'SERVER_ERROR';
    }
  }
}
