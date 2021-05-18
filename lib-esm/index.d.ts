import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { default as RequestService, RequestServiceError } from 'ts-request-service';
import { default as ResponseService, ResponseServiceError } from 'ts-response-service-cli';
declare type Callback = (error: any, response?: string | AxiosResponse<any>) => any;
declare class ApiService {
    baseUrl: string;
    req: RequestService;
    res: ResponseService;
    urlKey: string;
    constructor(config: any);
    protected buildQuery(queryParams: string | {
        [p: string]: any;
    }, queryString?: string): string;
    protected getUrl(url: string): string;
    protected processResponse(promise: Promise<AxiosResponse<any>>, callback: Callback): void;
    delete(url: string, callback: Callback, options?: AxiosRequestConfig): void;
    get(url: string, callback: Callback, options?: AxiosRequestConfig): void;
    getUri(callback: Callback, options: AxiosRequestConfig): void;
    head(url: string, callback: Callback, options?: AxiosRequestConfig): void;
    options(url: string, callback: Callback, options?: AxiosRequestConfig): void;
    patch(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): void;
    post(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): void;
    put(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): void;
}
export default ApiService;
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };
