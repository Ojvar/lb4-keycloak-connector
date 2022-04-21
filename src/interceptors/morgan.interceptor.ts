import {
  config,
  injectable,
  InvocationContext,
  InvocationResult,
  ValueOrPromise,
} from '@loopback/core';
import {ExpressMiddlewareInterceptorProvider} from '@loopback/rest';
import {IncomingMessage, ServerResponse} from 'http';
import morgan from 'morgan';

export type MorganOption = morgan.Options<IncomingMessage, ServerResponse>;

const morganFactory = (configs?: MorganOption) => morgan('combined', configs);
// const morganInterceptor = toInterceptor(morganFactory());

@injectable({tags: {key: MorganInterceptorProvider.BINDING_KEY}})
export class MorganInterceptorProvider extends ExpressMiddlewareInterceptorProvider<MorganOption> {
  static readonly BINDING_KEY = `interceptors.${MorganInterceptorProvider.name}`;

  constructor(@config() morganConfig?: MorganOption) {
    super(morganFactory, morganConfig);
    console.log('Morgan Inteceptor constructor');
  }

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    console.log('Morgan Inteceptor intecept');
    return next();
  }
}
