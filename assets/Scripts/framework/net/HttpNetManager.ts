import { handler, UT } from "../util/UtilTool";
import { NetUrlConstants } from "./NetUrlConstants";

/*
 * @Author: Yang Huan 
 * @Date: 2019-11-20 14:19:39 
 * @Last Modified by: Yang Huan
 * @Last Modified time: 2019-11-21 17:39:06
 *    native net 
 */

export enum HttpCode {
    kSuccess = 0,
    kTimeout = 10000,
    kUnknown = 10001,
    kSessionTimeout = -8,
    kIAmInBlocklist = -3013,
    kUserIsInMyBlocklist = -3014
}

export class HttpNetManager {
    private static _instance: HttpNetManager = null;

    public static getInstance(): HttpNetManager {
        if (!this._instance)
            this._instance = new HttpNetManager;
        return this._instance;
    }

    //handler
    doGet(url: string, params: any, resolve: Function, reject: Function, headers?: any, ) {
        if (params) {
            if (url.indexOf('?') == -1) {
                url += '?';
            }
            url += this.getQueryString(params);
        }
        this.doHttp(url, params, 'GET', resolve, reject, headers);
    }

    doPost(url: string, params: any, resolve: Function, reject: Function, headers?: any, ) {
        this.doHttp(url, params, "POST", resolve, reject, headers);
    }

    private doHttp(url: string, params: any, method: string, resolve: Function, reject?: Function, headers?: any, ) {
        let baseUrl = NetUrlConstants.isDebug ? NetUrlConstants.webetaUrl : NetUrlConstants.betaUrl;
        baseUrl = baseUrl.replace(/^\s+|\s+$/g, "");
        url = baseUrl + url + "?time=" + Date.parse(new Date().toString());

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = this.onreadystatechange.bind(this, xhr, resolve);
        xhr.ontimeout = this.onTimeout.bind(this, xhr, url);
        xhr.onerror = this.onError.bind(this, xhr, url);
        xhr.onabort = this.onAbort.bind(this, xhr, url);
        xhr.open(method, url, true);

        if (headers) {
            this.setHttpHeaders(xhr, headers);
        }
        /**
         *  "Accept-Encoding": "gzip,deflate"
         * "Content-Type", 'application/json;charset=utf-8'
         */
        if (cc.sys.isNative) {
            this.setHttpHeaders(xhr, { 'Content-Type': 'application/json;charset=utf-8' });
        }
        if (params && typeof params === "object") {
            params = JSON.stringify(params);
        }
        xhr.send(params);

    }

    private onreadystatechange(xhr: XMLHttpRequest, resolve: Function, reject: Function) {
        UT.log(`HttpService, onReadyStateChange, readyState=${xhr.readyState}, status=${xhr.status}`);
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
            UT.log(`HttpService, onReadyStateChange, responseText=${xhr.responseText}`);
            let data: any;
            let code = HttpCode.kUnknown;
            const response = JSON.stringify(xhr.responseText);
            if (response) {
                code = HttpCode.kSuccess;
                data = JSON.parse(xhr.responseText);
            }
            this.notifyCallback(resolve, code, data);
            this.removeXhrEvent(xhr);
        } else {
            reject(JSON.stringify(xhr.responseText));
        }
    }

    private onTimeout(xhr: XMLHttpRequest, url: string) {
        UT.log(`${url}, request ontimeout`);
        this.removeXhrEvent(xhr);
    }

    private onError(xhr: XMLHttpRequest, url: string) {
        UT.log(`${url}, request onerror`);
        this.removeXhrEvent(xhr);
    }

    private onAbort(xhr: XMLHttpRequest, url: string) {
        UT.log(`${url}, request onabort`);
        this.removeXhrEvent(xhr);
    }

    private removeXhrEvent(xhr: XMLHttpRequest) {
        xhr.ontimeout = null;
        xhr.onerror = null;
        xhr.onabort = null;
        xhr.onreadystatechange = null;
    }

    private notifyCallback(cb: Function, code: number, data?: any) {
        if (cb) {
            cb(data);
        }
    }

    private setHttpHeaders(xhr: XMLHttpRequest, headers: any) {
        for (const key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    }

    private getQueryString(params: any): string {
        let temps: string[] = [];
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                temps.push(`${key}=${params[key]}`)
            }
        }
        return temps.join('&');
    }
}

export const HttpNet = HttpNetManager.getInstance();