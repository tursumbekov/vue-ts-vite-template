import { isCorrectEnum } from '@/utils';

export enum ElementSizes {
    L = 'l-size',
    M = 'm-size',
    S = 's-size',
    XS = 'xs-size',
}

export const iconSizes: Readonly<Record<ElementSizes, number>> = {
    [ElementSizes.L]: 20,
    [ElementSizes.M]: 16,
    [ElementSizes.S]: 12,
    [ElementSizes.XS]: 8,
};

/**
 * @guard
 */
export const isElementSize: (token: unknown) => token is ElementSizes = isCorrectEnum(ElementSizes);
