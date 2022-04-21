/* eslint-disable @typescript-eslint/naming-convention */
import {inject, intercept} from '@loopback/core';
import {
  get,
  Request,
  response,
  ResponseObject,
  RestBindings,
} from '@loopback/rest';
import {protect} from '../interceptors';
import {MorganInterceptorProvider} from '../interceptors/morgan.interceptor';

/* Create our own factory */
// const morganFactory = (
//   config?: morgan.Options<IncomingMessage, ServerResponse>,
// ) => morgan('combined', config);
// const morganInterceptor = toInterceptor(morganFactory());

/* With package factory */
// const morganInterceptor = toInterceptor(morgan('combined'));

const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @intercept(MorganInterceptorProvider.BINDING_KEY)
  @intercept(protect('realm:myrole'))
  @get('/ping')
  @response(200, PING_RESPONSE)
  async ping(): Promise<object> {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  // Map to `GET /ping`
  @get('/ping2')
  @response(200, PING_RESPONSE)
  ping2(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack 2',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}

// export const PRIVATE_OJVAR = BindingKey.create<PrivateOjvarInterceptor>(
//   'interceptors.PrivateOjvarInterceptor',
// );
