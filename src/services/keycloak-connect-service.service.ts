/* eslint-disable @typescript-eslint/naming-convention */
import {
  Application,
  BindingScope,
  CoreBindings,
  inject,
  injectable,
  Provider,
} from '@loopback/core';
import KeycloakConnect from 'keycloak-connect';

export type KeycloakConnectService = unknown;

@injectable({scope: BindingScope.SINGLETON})
export class KeycloakConnectServiceProvider
  implements Provider<KeycloakConnectService>
{
  _kc: KeycloakConnect.Keycloak;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: Application,
  ) {
    this._kc = new KeycloakConnect(
      {},
      {
        realm: 'myrealm',
        'bearer-only': true,
        'auth-server-url': 'http://localhost:8080/auth/',
        'ssl-required': 'external',
        resource: 'oauth-playground2',
        'confidential-port': 0,
      },
    );
  }

  value(): KeycloakConnect.Keycloak {
    return this._kc;
  }
}
