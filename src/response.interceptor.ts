import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { RESPONSE_MESSAGE_KEY } from "./response-message.decorator";


@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const httpMethod: unknown = context.switchToHttp().getRequest().method;

        const customMessage = this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        return next.handle().pipe(
            map((data) => {
                let message = customMessage;

                if (!message) {
                    switch (httpMethod) {
                        case 'GET':
                            message = 'Resource retrieved successfully';
                            break;
                        case 'POST':
                            message = 'Resource created successfully';
                            break;
                        case 'PATCH':
                        case 'PUT':
                            message = 'Resource updated successfully';
                            break;
                        case 'DELETE':
                            message = 'Resource deleted successfully';
                            break;
                        default:
                            message = 'Successful';
                            break;
                    }
                }

                return {
                    statusCode,
                    message,
                    data,
                }
            })
        );

    }
}
