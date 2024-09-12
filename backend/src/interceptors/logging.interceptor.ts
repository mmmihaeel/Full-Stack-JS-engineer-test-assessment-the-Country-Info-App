import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ scope: Scope.REQUEST })
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    let logMessage = '';
    let ipAddress = '';
    let userAgent = '';

    const request = httpContext.getRequest();
    ipAddress = request.ip || request.connection.remoteAddress;
    userAgent = request.headers['user-agent'];
    logMessage = `HTTP ${request.method} ${request.url} - IP: ${ipAddress} - User-Agent: ${userAgent}`;
    this.logger.debug(
      `HTTP Request Headers: ${JSON.stringify(request.headers)}`,
    );
    this.logger.verbose(`HTTP Request Body: ${JSON.stringify(request.body)}`);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = `${Date.now() - now}ms`;
          const isHttp = !!httpContext.getResponse();
          const response = isHttp ? httpContext.getResponse() : null;

          this.logger.log(
            `${logMessage} - Response Time: ${responseTime} - Status: ${isHttp ? response?.statusCode : 'N/A'} - Response Data: ${JSON.stringify(data)}`,
          );

          this.logger.verbose(`HTTP Response Body: ${JSON.stringify(data)}`);
        },
        error: (error) => {
          const responseTime = `${Date.now() - now}ms`;
          const isHttp = !!httpContext.getResponse();
          this.logger.error(
            `${logMessage} - Response Time: ${responseTime} - Status: ${isHttp ? error?.status : 'N/A'} - Error: ${error.message}`,
            error.stack,
          );
        },
        complete: () => {
          const responseTime = `${Date.now() - now}ms`;
          const isHttp = !!httpContext.getResponse();
          const response = isHttp ? httpContext.getResponse() : null;

          this.logger.log(
            `${logMessage} - Response Time: ${responseTime} - Status: ${isHttp ? response?.statusCode : 'N/A'} - Request Completed`,
          );

          if (response?.statusCode >= 400) {
            this.logger.warn(`${logMessage} - Potential Issue Detected`);
          }
        },
      }),
    );
  }
}
