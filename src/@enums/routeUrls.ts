import { isCorrectEnum } from '@/utils';

export enum RouteUrls {
    MAIN = '/',
    NOT_FOUND = '/:pathMatch(.*)*',
}

export enum RouteNames {
    MAIN = 'Main',
    NOT_FOUND = 'NotFound',
}

/**
 * @guard
 */
export const isRouteUrl: (token: unknown) => token is RouteUrls = isCorrectEnum(RouteUrls);

/**
 * @guard
 */
export const isRouteName: (token: unknown) => token is RouteNames = isCorrectEnum(RouteNames);
