import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpStatusCode } from '@/@enums';
import { Pagination } from '@/@interfaces';
import { Nullable } from '@/@types';

export interface ResponseMeta {
    status_code: HttpStatusCode;
    message: string;
    pagination?: Pagination;
}

export interface AdvancedAxiosRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
    /**
     * Use unique ID to cancel previous pending request
     */
    singletonRequestId?: string;
}

export interface AdvancedAxiosResponse<T = Response, D = Response> extends AxiosResponse<T, D> {
    config: AdvancedAxiosRequestConfig<D>;
}

export interface Response<T = DefaultResponseDataType> {
    data: T;
    meta: Nullable<ResponseMeta>;
}

export interface ResponseError<T = DefaultResponseDataType> {
    response?: {
        data?: Response<T>;
        status?: HttpStatusCode;
    };
    meta: Nullable<ResponseMeta>;
}

export type AxiosConfig = { handleInterceptorErrorOnResponse?: HandleInterceptorErrorOnResponse };
export type DefaultResponseDataType = ResponseData | ResponseData[] | [] | ResponseDataArray;
export type HandleInterceptorErrorOnResponse = (error: AxiosError) => void;
export type ResponseData = Record<string, unknown>;
export type ResponseDataArray = Array<string | null | number>;
export type ResponseDataType = ResponseData | ResponseData[] | [] | ResponseDataArray;
export type ResponseErrors = Response<Record<string, string[]>>;
export type ResponseWithErrors = ResponseError<Record<string, string[]>>;
