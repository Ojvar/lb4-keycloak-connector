import {MiddlewareSequence, RequestContext} from '@loopback/rest';
import KeycloakConnect from 'keycloak-connect';
import {KEYCLOAK_CONNECTOR_SERVICE} from './keys';

export class MySequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    const keycloak: KeycloakConnect.Keycloak = await context.get(
      KEYCLOAK_CONNECTOR_SERVICE,
    );

    const finished = await this.invokeMiddleware(
      context,
      keycloak.middleware(),
    );

    return !finished ? super.handle(context) : undefined;
  }
}
