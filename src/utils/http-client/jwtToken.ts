import { Nullable } from '@/@types';
import { JWT_TOKEN } from '@/utils';

export function setToken(token: string): void {
    window.localStorage.setItem(JWT_TOKEN, token);
}

export function getToken(): Nullable<string> {
    return window.localStorage.getItem(JWT_TOKEN);
}

export function removeToken(): void {
    window.localStorage.removeItem(JWT_TOKEN);
}

/**
 * @guard
 */
export function tokenIsString(token: unknown): token is string {
    return Boolean(typeof token === 'string' && token.length);
}
