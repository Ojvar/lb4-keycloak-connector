import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import KeycloakConnect from 'keycloak-connect';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    const keycloak: KeycloakConnect.Keycloak = await context.get(
      'services.KeycloakConnectService',
    );

    const finished = await this.invokeMiddleware(
      context,
      keycloak.middleware(),
    );
    if (finished) {
      return;
    }

    return super.handle(context);
  }
}
