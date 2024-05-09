declare global {
  interface Request {
    expoUrl: {
      href: string;
      origin: string;
      protocol: string;
      username: string;
      password: string;
      host: string;
      hostname: string;
      port: string;
      pathname: string;
      search: string;
      searchParams: URLSearchParams;
      hash: string;
    };
  }
}
