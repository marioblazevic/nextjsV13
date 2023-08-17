import Nextauth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string;
      role?: string;
      id?: string;
    };
  }
}
