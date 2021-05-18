import { AxiosRequestConfig, AxiosResponse }                from 'axios';
import { default as RequestService, RequestServiceError }   from 'ts-request-service';
import { default as ResponseService, ResponseServiceError } from 'ts-response-service-cli';

class ApiService {
  baseUrl: string;
  req: RequestService;
  res = new ResponseService();
  urlKey: string;

  constructor(config) {
    const {baseUrl, urlKey, ...AxiosConfig} = config;

    this.baseUrl = baseUrl;
    this.urlKey  = urlKey;

    this.req = new RequestService(AxiosConfig);
  }

  protected buildQuery(queryParams: string | {[p: string]: any}, queryString = ''): string {
    if (typeof queryParams === 'string') {
      return `?${new URLSearchParams(`${queryString}${queryString.indexOf('?') >= 0
        ? '&'
        : '?'}${queryParams}&`).toString()}`;
    }

    return `?${new URLSearchParams(Object.keys(queryParams)
                                     .reduce(
                                       (query, param) => `${query}${param}=${queryParams[param]}&`,
                                       '?',
                                     )).toString()}`;
  }

  protected getUrl(url: string): string {
    const baseUrl = this.baseUrl.replace(/\/$/, '');
    const urlKey  = this.urlKey.replace(/^\//, '').replace(/\/$/, '');
    const isQuery = /^\?/.test(url);

    const queryString = `${baseUrl}/${urlKey}${isQuery ? url : `${urlKey.length > 0 ? '/' : ''}${url}`}`;

    return queryString.replace(/&$/, '').replace(/\?$/, '').replace(/\/$/, '');
  }

  protected processResponse(promise: Promise<AxiosResponse<any>>, callback: Callback): Promise<any> {
    const response = this.res.processResponse(promise)
      .then(this.res.doSuccessAction)
      .catch(this.res.doFailureAction);

    return response.then((res: AxiosResponse<any>) => callback(false, res), (err) => callback(err));
  }

  delete(url: string, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.delete(this.getUrl(url), options), callback);
  }

  get(url: string, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.get(this.getUrl(url), options), callback);
  }

  getUri(callback: Callback, options: AxiosRequestConfig): void {
    callback(false, this.req.getUri(options));
  }

  head(url: string, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.head(this.getUrl(url), options), callback);
  }

  options(url: string, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.options(this.getUrl(url), options), callback);
  }

  patch(url: string, data: any, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.patch(this.getUrl(url), data, options), callback);
  }

  post(url: string, data: any, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.post(this.getUrl(url), data, options), callback);
  }

  put(url: string, data: any, callback: Callback, options: AxiosRequestConfig = {}): Promise<any> {
    return this.processResponse(this.req.put(this.getUrl(url), data, options), callback);
  }
}

export default ApiService;
export type Callback = (error: any, response?: string | AxiosResponse<any>) => any;
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };