import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { CommonResponseType } from "@shortwaits/shared-types";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, CommonResponseType<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<CommonResponseType<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data ? data.message : "",
        data,
        meta: {
          size: data ? data.length : null,
        }, // if this is supposed to be the actual return then replace {} with data.result
      }))
    );
  }
}
