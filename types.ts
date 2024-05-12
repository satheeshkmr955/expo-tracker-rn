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

export type ISODateString = string;

export interface DefaultSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}

export interface Session extends DefaultSession {
  accessToken?: string;
  user?: DefaultSession["user"] & { slugName: string; id: string };
}
