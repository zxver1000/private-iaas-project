import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Logger,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';

import { map, Observable } from 'rxjs';

export function SuccessInterceptor(
  successCode: HttpStatus,
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    private logger = new Logger('SuccessInterceptor');
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {

  
      return next.handle().pipe(
        map((data) => {
          return this.setDataWrapper(data);
        }),
      );
      // ({ ...data, result: uploadedArray })));
    }

    setDataWrapper(Result) {
      const success = Result !== null;
      const code = success ? successCode : HttpStatus.NO_CONTENT;

      if (typeof Result === 'number') {
        if (Result >= 200 && Result < 400) {
          return {
            success: true,
            code: Result,
          };
        }

        return {
          success: false,
          code: Result,
        };
      }

      this.logger.debug('Result:', Result);

      if (!Result.length) {
        Result = [Result];
      }

      const result = [];
      for (let i = 0; i < Result.length; i++) {
        const _file = Result[i];
        result.push(_file);
      }

      return {
        success,
        code,
        result,
      };
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}