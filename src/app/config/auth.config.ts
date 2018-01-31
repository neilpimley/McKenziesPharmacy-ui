import { environment } from '../../environments/environment';

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
  };

export const myConfig: AuthConfig = {
    CLIENT_ID: 'DMERsQEwLtGRkZ9jtFT09mKv0PGccZzf',
    CLIENT_DOMAIN: 'neilpimley.eu.auth0.com',
    AUDIENCE: 'https://mckenzies/api',
    REDIRECT: environment.callbackURL,
    SCOPE: 'openid profile'
};

