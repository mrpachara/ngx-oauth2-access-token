import {
  ACCESS_TOKEN_STORAGE_FACTORY,
  AUTHORIZATION_CODE_STORAGE_FACTORY,
} from './types';
import { AccessTokenLocalStorageFactoryService } from './storage/access-token-local-storage-factory.service';
import { AuthorizationCodeLocalStorageFactoryService } from './storage/authorization-code-local-storage-factory.service';

export const NGX_OAUTH2_ACCESS_TOKEN_PROVIDERS = [
  {
    provide: ACCESS_TOKEN_STORAGE_FACTORY,
    useClass: AccessTokenLocalStorageFactoryService,
  },
  {
    provide: AUTHORIZATION_CODE_STORAGE_FACTORY,
    useClass: AuthorizationCodeLocalStorageFactoryService,
  },
] as const;
