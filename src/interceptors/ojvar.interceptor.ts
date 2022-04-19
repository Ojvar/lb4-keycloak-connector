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
import {Keycloak} from '../services';

@globalInterceptor('middleware', {tags: {name: 'Ojvar'}})
export class OjvarInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(RestBindings.Http.RESPONSE) private resp: Response,
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.Keycloak') private keycloak: Keycloak,
  ) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    const middlewares = this.keycloak.middleware();
    for (const m of middlewares) {
      await m.bind(this, this.req, this.resp, next);
    }

    return next();
  }
}
