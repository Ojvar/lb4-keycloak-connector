import {
  globalInterceptor,
  inject,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {Request, Response, RestBindings} from '@loopback/rest';

@globalInterceptor('middleware', {tags: {name: 'Ojvar'}})
export class OjvarInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private resp: Response,
    @inject(RestBindings.Http.REQUEST) private req: Request,
  ) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    return next();
  }
}
