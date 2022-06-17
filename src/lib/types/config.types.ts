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

export type AccessTokenServiceConfig = NameableConfig & DebugableConfig & {};

export type AuthorizationCodeServiceConfig = NameableConfig &
  DebugableConfig & {
    redirectUri: string;
    pkce: boolean;
  };
