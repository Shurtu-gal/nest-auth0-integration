import { fetchUtils } from 'react-admin';
import { client } from '../auth-provider/ra-auth-auth0';

/**
 * An httpClient that adds authentication headers needed by Auth0 in all requests.
 * @returns a function with the same definition as `httpClient` that adds an `Authorization` header containing the Auth0 token.
 */
export const CustomHttpClient = async (
  url: string,
  options: fetchUtils.Options | undefined = {},
) => {
  const token = await client.getTokenSilently();
  const requestHeaders = getAuth0Headers(token, options);
  return fetchUtils.fetchJson(url, {
    ...options,
    headers: requestHeaders,
  });
};

/**
 * Return the headers needed by Auth0.
 * @param token the Auth0 token
 * @param options the fetch options (so that we do not override other headers)
 * @returns the headers needed by Auth0
 */
export const getAuth0Headers = (
  token: string | null,
  options: fetchUtils.Options | undefined,
): Headers => {
  const headers = ((options && options.headers) ||
    new Headers({
      Accept: 'application/json',
    })) as Headers;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
