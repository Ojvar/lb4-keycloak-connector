/* eslint-disable @typescript-eslint/naming-convention */
import {
  Application,
  BindingScope,
  CoreBindings,
  inject,
  injectable,
  Provider,
} from '@loopback/core';
import session from 'express-session';
import KeycloakConnect from 'keycloak-connect';
export type KeycloakConnectService = KeycloakConnect.Keycloak;

@injectable({scope: BindingScope.TRANSIENT})
export class KeycloakConnectServiceProvider
  implements Provider<KeycloakConnectService>
{
  _kc: KeycloakConnect.Keycloak;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: Application,
  ) {
    let memoryStore = new session.MemoryStore();
    this._kc = new KeycloakConnect({store: memoryStore});
  }

  value(): KeycloakConnect.Keycloak {
    return this._kc;
  }
}
