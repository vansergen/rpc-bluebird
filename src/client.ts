import fetch from "node-fetch";
import Bluebird from "bluebird";
import { UnsuccessfulFetch } from "./error";

declare module "node-fetch" {
  let Promise: typeof Bluebird;
}

fetch.Promise = Bluebird;

export type ITransformType =
  | "buffer"
  | "arrayBuffer"
  | "blob"
  | "json"
  | "text"
  | "raw";

export interface FetchClientOptions {
  baseUrl?: string | URL;
  transform?: ITransformType;
  rejectNotOk?: boolean;
}

export interface IClientOptions extends FetchClientOptions {
  transform: ITransformType;
  rejectNotOk: boolean;
}

export const DefaultTransform = "raw";

export class FetchClient<T = fetch.Response> {
  #fetchOptions: fetch.RequestInit;

  readonly #clientOptions: IClientOptions;

  public constructor(
    fetchOptions: fetch.RequestInit = {},
    {
      rejectNotOk = true,
      transform = DefaultTransform,
      baseUrl,
    }: FetchClientOptions = {}
  ) {
    const headers = new fetch.Headers(fetchOptions.headers);
    this.#fetchOptions = { ...fetchOptions, headers };
    this.#clientOptions = { rejectNotOk, baseUrl, transform };
  }

  public get fetchOptions(): fetch.RequestInit {
    return this.#fetchOptions;
  }

  public set fetchOptions(options: fetch.RequestInit) {
    this.#fetchOptions = FetchClient.mergeFetchOptions(
      this.#fetchOptions,
      options
    );
  }

  public get(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "GET" });
  }

  public head(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "HEAD" });
  }

  public post(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "POST" });
  }

  public put(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "PUT" });
  }

  public delete(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "DELETE" });
  }

  public options(
    path = "",
    _fetchOptions: fetch.RequestInit = {}
  ): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "OPTIONS" });
  }

  public trace(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "TRACE" });
  }

  public patch(path = "", _fetchOptions: fetch.RequestInit = {}): Bluebird<T> {
    return this.fetch(path, { ..._fetchOptions, method: "PATCH" });
  }

  public fetch(path = "", options: fetch.RequestInit = {}): Bluebird<T> {
    return new Bluebird<T>((resolve, reject) => {
      const { baseUrl, rejectNotOk, transform } = this.#clientOptions;
      const url = new URL(path, baseUrl).toString();
      const fetchOptions = FetchClient.mergeFetchOptions(
        this.#fetchOptions,
        options
      );
      fetch(url, fetchOptions)
        .then((response) => {
          if (rejectNotOk && !response.ok) {
            reject(new UnsuccessfulFetch(response.statusText, response));
          } else if (transform === "raw") {
            resolve(response as unknown as T);
          } else {
            response[transform]()
              .then((data) => {
                resolve(data as T);
              })
              .catch(reject);
          }
        })
        .catch(reject);
    });
  }

  private static mergeFetchOptions(
    { headers: headers1, ...rest1 }: fetch.RequestInit,
    { headers: headers2, ...rest2 }: fetch.RequestInit
  ): fetch.RequestInit {
    const headers = new fetch.Headers(headers1);
    const _headers = new fetch.Headers(headers2);
    for (const [key, value] of _headers) {
      headers.set(key, value);
    }
    return { ...rest1, ...rest2, headers };
  }
}

export default FetchClient;
