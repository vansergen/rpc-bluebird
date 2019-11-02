import * as request from "request-promise";

export type RPCOtpions = request.RequestPromiseOptions | request.Options;

export class RPC {
  _rpoptions: RPCOtpions;

  constructor(options: RPCOtpions = {}) {
    this._rpoptions = options;
  }

  get(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "GET" });
  }

  post(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "POST" });
  }

  put(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "PUT" });
  }

  patch(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "PATCH" });
  }

  delete(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "DELETE" });
  }

  head(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "HEAD" });
  }

  options(options: RPCOtpions = {}) {
    return this.request({ ...options, method: "OPTIONS" });
  }

  request(options: RPCOtpions = {}) {
    return this.defaults(RPC.prepareOptions(options, this._rpoptions));
  }

  static cookie(key: string, value: string) {
    return request.cookie(key + "=" + value);
  }

  static jar(cookieStore?: any) {
    return request.jar(cookieStore);
  }

  static defaults(
    options: request.RequestPromiseOptions = {}
  ): request.RequestPromiseAPI {
    return request.defaults(options);
  }

  static prepareOptions(
    options: RPCOtpions,
    rpoptions: RPCOtpions
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

  get defaults(): request.RequestPromiseAPI {
    return RPC.defaults(this._rpoptions);
  }
}
