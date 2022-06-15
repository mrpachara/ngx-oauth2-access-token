import { InjectionToken } from '@angular/core';

export type NameableConfig = {
  name: string;
};

export type DebugableConfig = {
  debug: boolean;
};

export type Oauth2ClientConfig = {
  clientId: string;
  clientSecret: string | null;
  authorizationCodeUrl: string;
  accessTokenUrl: string;
  clientCredentialsInParams: boolean;
};

export type AccessTokenDispatcherConfig = NameableConfig & DebugableConfig & {};

export type AuthorizationCodeDispatcherConfig = NameableConfig &
  DebugableConfig & {
    redirectUri: string;
    pkce: boolean;
  };

export const OAUTH2_CLIENT_CONFIG = new InjectionToken<Oauth2ClientConfig>(
  'oauth2-client-config',
);

export const ACCESS_TOKEN_DISPATCHER_CONFIG =
  new InjectionToken<AccessTokenDispatcherConfig>(
    'access-token-dispatcher-config',
  );

export const AUTHORIZATION_CODE_DISPATCHER_CONFIG =
  new InjectionToken<AuthorizationCodeDispatcherConfig>(
    'authorization-code-dispatcher-config',
  );
