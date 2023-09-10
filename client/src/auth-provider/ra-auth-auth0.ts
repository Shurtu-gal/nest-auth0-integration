import { Auth0Client } from "@auth0/auth0-spa-js";
import { AuthProvider } from "react-admin";

const client = new Auth0Client({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  cacheLocation: "localstorage",
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
  useRefreshTokens: true,
});

export const Auth0AuthProvider : AuthProvider = {
  login: async () => {
    client.loginWithRedirect({
      authorizationParams: {
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      },
    });
  },

  logout: async () => {
    return client.logout({
      logoutParams: {
        returnTo: import.meta.env.VITE_LOGOUT_REDIRECT_URI,
      }
    });
  },

  checkAuth: async () => {
    const isAuthenticated = await client.isAuthenticated();
    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }
  },

  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
        throw new Error('Unauthorized');
    }
  },

  getPermissions: async() => {
    if (!(await client.isAuthenticated())) {
        return;
    }

    const claims = await client.getIdTokenClaims();
    console.log(claims);
    Promise.resolve();
  }
};



