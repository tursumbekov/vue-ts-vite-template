import { isCorrectEnum } from '@/utils';

export enum NodeEnv {
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production',
}

/**
 * @guard
 */
export const isNodeEnv: (token: unknown) => token is NodeEnv = isCorrectEnum(NodeEnv);
