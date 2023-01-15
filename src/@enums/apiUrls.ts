import { isCorrectEnum } from '@/utils';

export enum ApiUrls {
    // Auth
    LOGIN = '/oauth/login',

    // Users
    CURRENT_USER = '/users/current',
    USERS = '/users/%s',
}

/**
 * @guard
 */
export const isApiUrl: (token: unknown) => token is ApiUrls = isCorrectEnum(ApiUrls);
