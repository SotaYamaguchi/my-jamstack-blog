interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
  }
}

declare type PromiseResult<T> = T extends Promise<infer U> ? U : T;
