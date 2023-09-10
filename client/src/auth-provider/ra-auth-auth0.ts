import { Auth0Client } from '@auth0/auth0-spa-js';
import {
  AuthProvider,
  PreviousLocationStorageKey,
  UserIdentity,
} from 'react-admin';

const client = new Auth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  cacheLocation: 'localstorage',
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  useRefreshTokens: true,
});

export const Auth0AuthProvider: AuthProvider = {
  login: async () => {
    await client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      },
    });

    return Promise.resolve();
  },

  logout: async () => {
    client.logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_LOGOUT_REDIRECT_URI,
      },
    });

    return Promise.resolve();
  },

  async checkAuth() {
    const isAuthenticated = await client.isAuthenticated();
    if (isAuthenticated) {
      return Promise.resolve();
    }

    localStorage.setItem(PreviousLocationStorageKey, window.location.href);

    return Promise.reject();
  },

  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
      throw new Error('Unauthorized');
    }
  },

  getPermissions: async () => {
    // if (!(await client.isAuthenticated())) {
    //     return;
    // }

    // const claims = await client.getIdTokenClaims();
    // console.log(claims);
    Promise.resolve();
  },

  getIdentity: async () => {
    if (!(await client.isAuthenticated())) {
      throw new Error('User not authenticated');
    }

    const user = await client.getUser();

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.sub,
      fullName: user.name,
      avatar: user.picture,
      email: user.email,
    } as UserIdentity;
  },

  handleCallback: async () => {
    const query = window.location.search;
    if (query.includes('code=') && query.includes('state=')) {
      // throw new Error('Failed to handle login callback.');
      try {
        const result = await client.handleRedirectCallback(window.location.href);
        console.log(result);
        localStorage.removeItem(PreviousLocationStorageKey);
        return;
      } catch (error) {
        throw new Error('Failed to handle login callback: ' + error);
      }
    }
    throw new Error('Failed to handle login callback.');
  },
};
