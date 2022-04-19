import {
  InvocationContext,
  InvocationResult,
  ValueOrPromise,
} from '@loopback/core';
import {RestBindings} from '@loopback/rest';
import KeycloakConnect from 'keycloak-connect';

export function protect(roles: string) {
  return async (
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) => {
    const keycloak = await invocationCtx.get<KeycloakConnect.Keycloak>(
      'services.Keycloak',
    );

    const req = await invocationCtx.get(RestBindings.Http.REQUEST);
    const resp = await invocationCtx.get(RestBindings.Http.RESPONSE);
    return keycloak.protect(roles)(req, resp, next);
  };
}
