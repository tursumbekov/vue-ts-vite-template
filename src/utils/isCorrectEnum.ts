import { ValueOf } from '@/@types';

/**
 * It's a generic for type guards
 * @param e { Enum } - Verifiable value
 */
export const isCorrectEnum: <Enum>(e: Enum) => (token: unknown) => token is ValueOf<Enum> =
    <Enum>(e: Enum) =>
    (token: unknown): token is ValueOf<Enum> =>
        Object.values(e as { [s: string]: unknown }).includes(token);
