/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable, Provider} from '@loopback/core';
import KeycloakConnect from 'keycloak-connect';

export type KeycloakConnectService = unknown;

@injectable({scope: BindingScope.SINGLETON})
export class KeycloakConnectServiceProvider
  implements Provider<KeycloakConnectService>
{
  _kc: KeycloakConnect.Keycloak;

  constructor() {
    this._kc = new KeycloakConnect(
      {},
      {
        realm: 'myrealm',
        'auth-server-url': 'http://localhost:8080/auth/',
        'ssl-required': 'external',
        resource: 'oauth-playground',
        'confidential-port': 0,
      },
    );
  }

  value(): KeycloakConnect.Keycloak {
    return this._kc;
  }
}
