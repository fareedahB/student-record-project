import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


@Injectable()
export class ResponseInterceptor implements NestInterceptor{ 
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const httpMethod: unknown = context.switchToHttp().getRequest().method;
        
        let message = '';

        return next.handle().pipe(
            map((data) => {
                switch (httpMethod) {
                    case 'GET':
                        message = 'Student record get successfully';
                        break;
                    case 'POST':
                        message = 'Student created successfully';
                        break;
                    case 'PATCH':
                        message = 'Student record updated successfully';
                        break;
                    case 'DELETE':
                        message = 'Student deleted successfully';
                        break;
                    default:
                        message = 'Successful';
                        break;
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