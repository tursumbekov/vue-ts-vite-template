export type JwtToken = 'access_token';

export const BACKEND_URL: Readonly<string> = import.meta.env.VITE_BACKEND_URL;
export const BASE_API_URL: Readonly<string> = `${BACKEND_URL}/api/v1`;
export const JWT_TOKEN: Readonly<JwtToken> = 'access_token';
