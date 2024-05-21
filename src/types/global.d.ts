declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HOME_LOCATION: string;
    }
  }
}
export {};
