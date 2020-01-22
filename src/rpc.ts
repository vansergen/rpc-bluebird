import * as request from "request-promise";
import { Cookie, CookieJar } from "request";

export type RPCOptions = request.RequestPromiseOptions | request.Options;

export class RPC {
  _rpoptions: RPCOptions;

  constructor(options: RPCOptions = {}) {
    this._rpoptions = options;
  }

  get(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "GET" });
  }

  post(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "POST" });
  }

  put(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "PUT" });
  }

  patch(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "PATCH" });
  }

  delete(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "DELETE" });
  }

  head(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "HEAD" });
  }

  options(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.request({ ...options, method: "OPTIONS" });
  }

  request(options: RPCOptions = {}): request.RequestPromise<any> {
    return this.defaults(RPC.prepareOptions(options, this._rpoptions));
  }

  /**
   * Create a new cookie
   */
  static cookie(key: string, value: string): Cookie | undefined {
    return request.cookie(key + "=" + value);
  }

  /**
   * Create a new cookie jar
   */
  static jar(cookieStore?: any): CookieJar {
    return request.jar(cookieStore);
  }

  static defaults(
    options: request.RequestPromiseOptions = {}
  ): request.RequestPromiseAPI {
    return request.defaults(options);
  }

  static prepareOptions(
    options: RPCOptions,
    rpoptions: RPCOptions
  ): request.Options {
    if (!("url" in options || "uri" in options)) {
      if (!("url" in rpoptions || "uri" in rpoptions)) {
        throw new Error("options.uri is a required argument");
      }
      if ("uri" in rpoptions) {
        return { ...options, uri: rpoptions.uri };
      }
      return { ...options, uri: rpoptions.url };
    }
    return options;
  }

  private get defaults(): request.RequestPromiseAPI {
    return RPC.defaults(this._rpoptions);
  }
}
