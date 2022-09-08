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
      map((payload) => {
        let meta = null;
        let message = null;
        if (typeof payload === "object" && payload?.meta) {
          meta = payload.meta;
          delete payload.meta;
        }
        if (typeof payload === "object" && payload?.message) {
          message = payload.message;
          delete payload.message;
        }
        return {
          data: payload,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message,
          meta, // if this is supposed to be the actual return then replace {} with data.result
        };
      })
    );
  }
}
