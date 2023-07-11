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
      map(payload => {
        let meta = null;
        let message = null;
        let errorCode = null;
        const statusCode = context.switchToHttp().getResponse().statusCode;
        console.log("payload >>>", payload);
        console.log("statusCode >>>", statusCode);

        if (typeof payload === "object" && payload?.meta) {
          meta = payload.meta;
          delete payload.meta;
        }
        if (typeof payload === "object" && payload?.message) {
          message = payload.message;
          delete payload.message;
        }
        if (typeof payload === "object" && payload?.errorCode) {
          errorCode = payload.errorCode;
          delete payload.errorCode;
        }

        if (statusCode >= 400) {
          return {
            data: null,
            statusCode,
            message,
            errorCode,
          };
        }

        return {
          data: payload ?? null,
          statusCode,
          meta,
        };
      })
    );
  }
}