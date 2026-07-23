import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        const statusCode = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: string | string[] = 'Internal server error';
        if (exception instanceof HttpException) {
            const body = exception.getResponse();
            message = typeof body === 'string'
                ? body
                : ((body as { message?: string | string[] }).message ?? exception.message);
        }

        response.status(statusCode).json({
            statusCode,
            message,
            data: null,
        });
    }
}
