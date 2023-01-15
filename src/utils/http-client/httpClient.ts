import axios, { AxiosError, AxiosInstance } from 'axios';
import Qs from 'qs';
import {
    AdvancedAxiosRequestConfig,
    AdvancedAxiosResponse,
    AxiosConfig,
    HandleInterceptorErrorOnResponse,
    Response,
    ResponseError,
    ResponseWithErrors,
} from '@/@interfaces';
import { Optional } from '@/@types';
import { ApiException, getToken } from '@/utils';

export class HttpClient {
    private readonly instance: AxiosInstance;
    private readonly handleInterceptorErrorOnResponse?: HandleInterceptorErrorOnResponse;

    constructor(baseURL: string, config?: AxiosConfig) {
        this.instance = axios.create({
            baseURL,
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        });

        this.handleInterceptorErrorOnResponse = config?.handleInterceptorErrorOnResponse;
        this.initializeSingletonRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    public get<T, D = unknown>(url: string, config?: AdvancedAxiosRequestConfig<D>): Promise<T> {
        return this.instance.get(url, config);
    }

    public post<T, D = unknown>(url: string, data?: D, config?: AdvancedAxiosRequestConfig<D>): Promise<T> {
        return this.instance.post(url, data, config);
    }

    public put<T, D = unknown>(url: string, data?: D, config?: AdvancedAxiosRequestConfig<D>): Promise<T> {
        return this.instance.put(url, data, config);
    }

    public delete<T, D = unknown>(url: string, config?: AdvancedAxiosRequestConfig<D>): Promise<T> {
        return this.instance.delete(url, config);
    }

    public isCancel = (error: Error | ResponseError) => axios.isCancel(error);

    /**
     * Get promise rejection with error message from response
     * @param error {ResponseWithErrors}
     * @throws ApiException
     */
    public processError = (error?: ResponseWithErrors) => {
        throw new ApiException(error);
    };

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.request.use((config: AdvancedAxiosRequestConfig) => {
            config.paramsSerializer = <T>(params: T) => Qs.stringify(params);
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${getToken()}`,
            };
            return config;
        });

        this.instance.interceptors.response.use(this.handleResponse, this.handleError);
    };

    private handleResponse = (response: AdvancedAxiosResponse): Response => {
        const { data, meta } = response.data;
        return { data, meta };
    };

    private handleError = (error: AxiosError): Promise<AxiosError> => {
        this.handleInterceptorErrorOnResponse?.(error);
        return Promise.reject(error);
    };

    private initializeSingletonRequestInterceptor = () => {
        if (typeof AbortController === 'undefined') {
            return;
        }
        const singletonRequests: { [key: string]: Optional<() => void> } = {};

        function getSingletonRequestId(config: AdvancedAxiosRequestConfig) {
            return config?.singletonRequestId;
        }

        function deleteSingletonRequest(id: string) {
            singletonRequests[id] = undefined;
        }

        this.instance.interceptors.request.use((config: AdvancedAxiosRequestConfig) => {
            const singletonRequestId: string | undefined = getSingletonRequestId(config);
            if (singletonRequestId) {
                singletonRequests[singletonRequestId]?.();
                const controller: AbortController = new AbortController();
                config.signal = controller.signal;
                singletonRequests[singletonRequestId] = () => {
                    if (singletonRequests[singletonRequestId]) {
                        deleteSingletonRequest(singletonRequestId);
                        controller.abort();
                    }
                };
            }
            return config;
        });
        this.instance.interceptors.response.use((response: AdvancedAxiosResponse) => {
            const singletonRequestId: string | undefined = getSingletonRequestId(response?.config);
            if (singletonRequestId) {
                deleteSingletonRequest(singletonRequestId);
            }
            return response;
        });
    };
}
