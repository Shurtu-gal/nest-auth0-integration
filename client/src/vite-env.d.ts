/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_AUTH0_AUDIENCE: string;
  VITE_AUTH0_REDIRECT_URI: string;
  VITE_AUTH0_LOGOUT_REDIRECT_URI: string;
  VITE_AUTH0_SCOPE: string;
  VITE_API_URL: string;
}
