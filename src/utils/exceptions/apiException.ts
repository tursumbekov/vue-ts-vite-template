import { HttpStatusCode } from '@/@enums';
import { ResponseErrors, ResponseWithErrors } from '@/@interfaces';
import { Optional } from '@/@types';

export function getCode(error?: ResponseWithErrors) {
    return error?.response?.data?.meta?.status_code || error?.response?.status;
}

export function getErrorMessage(error?: ResponseWithErrors) {
    const data: Optional<ResponseErrors> = error?.response?.data || (error as ResponseErrors);
    return [
        data?.meta?.message,
        ...Object.values(data?.data && typeof data?.data === 'object' ? data.data : {}).flatMap(
            (value: string[]) => value,
        ),
    ]
        .filter(
            (text: Optional<string>, index: number, self: Optional<string>[]) => text && self.indexOf(text) === index,
        )
        .join(' ');
}

export class ApiException extends Error {
    code: Optional<HttpStatusCode>;

    constructor(error?: ResponseWithErrors) {
        super(getErrorMessage(error));
        this.code = getCode(error);
    }
}
