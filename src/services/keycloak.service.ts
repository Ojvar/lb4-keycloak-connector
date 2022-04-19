import {/* inject, */ BindingScope, injectable, Provider} from '@loopback/core';
import session from 'express-session';
import KeycloakConnect from 'keycloak-connect';

export type Keycloak = KeycloakConnect.Keycloak;

@injectable({scope: BindingScope.SINGLETON})
export class KeycloakProvider implements Provider<Keycloak> {
  value() {
    const memoryStore = new session.MemoryStore();
    return new KeycloakConnect({store: memoryStore});
  }
}
