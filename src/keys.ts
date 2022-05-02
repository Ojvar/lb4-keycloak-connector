import {BindingKey} from '@loopback/core';
import {KeycloakConnectService} from './services';

export const KEYCLOAK_CONNECTOR_SERVICE =
  BindingKey.create<KeycloakConnectService>('services.KeycloakConnectService');
