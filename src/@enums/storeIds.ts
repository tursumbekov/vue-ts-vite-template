import { isCorrectEnum } from '@/utils';

export enum StoreIds {
    SVG = 'SVG',
}

/**
 * @guard
 */
export const isStoreId: (token: unknown) => token is StoreIds = isCorrectEnum(StoreIds);
