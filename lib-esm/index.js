var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { default as RequestService, RequestServiceError } from 'ts-request-service';
import { default as ResponseService, ResponseServiceError } from 'ts-response-service-cli';
var ApiService = /** @class */ (function () {
    function ApiService(config) {
        this.res = new ResponseService();
        var baseUrl = config.baseUrl, urlKey = config.urlKey, AxiosConfig = __rest(config, ["baseUrl", "urlKey"]);
        this.baseUrl = baseUrl;
        this.urlKey = urlKey;
        this.req = new RequestService(AxiosConfig);
    }
    ApiService.prototype.buildQuery = function (queryParams, queryString) {
        if (queryString === void 0) { queryString = ''; }
        if (typeof queryParams === 'string') {
            return "?" + new URLSearchParams("" + queryString + (queryString.indexOf('?') >= 0
                ? '&'
                : '?') + queryParams + "&").toString();
        }
        return "?" + new URLSearchParams(Object.keys(queryParams)
            .reduce(function (query, param) { return "" + query + param + "=" + queryParams[param] + "&"; }, '?')).toString();
    };
    ApiService.prototype.getUrl = function (url) {
        var baseUrl = this.baseUrl.replace(/\/$/, '');
        var urlKey = this.urlKey.replace(/^\//, '').replace(/\/$/, '');
        var isQuery = /^\?/.test(url);
        var queryString = baseUrl + "/" + urlKey + (isQuery ? url : "" + (urlKey.length > 0 ? '/' : '') + url);
        return queryString.replace(/&$/, '').replace(/\?$/, '').replace(/\/$/, '');
    };
    ApiService.prototype.processResponse = function (promise, callback) {
        var response = this.res.processResponse(promise)
            .then(this.res.doSuccessAction)
            .catch(this.res.doFailureAction);
        return response.then(function (res) { return callback(false, res); }, function (err) { return callback(err); });
    };
    ApiService.prototype.delete = function (url, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.delete(this.getUrl(url), options), callback);
    };
    ApiService.prototype.get = function (url, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.get(this.getUrl(url), options), callback);
    };
    ApiService.prototype.getUri = function (callback, options) {
        callback(false, this.req.getUri(options));
    };
    ApiService.prototype.head = function (url, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.head(this.getUrl(url), options), callback);
    };
    ApiService.prototype.options = function (url, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.options(this.getUrl(url), options), callback);
    };
    ApiService.prototype.patch = function (url, data, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.patch(this.getUrl(url), data, options), callback);
    };
    ApiService.prototype.post = function (url, data, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.post(this.getUrl(url), data, options), callback);
    };
    ApiService.prototype.put = function (url, data, callback, options) {
        if (options === void 0) { options = {}; }
        return this.processResponse(this.req.put(this.getUrl(url), data, options), callback);
    };
    return ApiService;
}());
export default ApiService;
export { RequestService, RequestServiceError, ResponseService, ResponseServiceError };
//# sourceMappingURL=index.js.map