import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { default as RequestService, RequestServiceError } from 'ts-request-service';
import { default as ResponseService, ResponseServiceError } from 'ts-response-service-cli';
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
    protected processResponse(promise: Promise<AxiosResponse<any>>, callback: Callback): Promise<any>;
    delete(url: string, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    get(url: string, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    getUri(callback: Callback, options: AxiosRequestConfig): void;
    head(url: string, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    options(url: string, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    patch(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    post(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
    put(url: string, data: any, callback: Callback, options?: AxiosRequestConfig): Promise<any>;
}
export default ApiService;
export declare type Callback = (error: any, response?: string | AxiosResponse<any>) => any;
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };
