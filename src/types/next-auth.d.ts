import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      teamId: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    teamId?: string | null;
  }

  interface JWT {
    role?: string;
    teamId?: string | null;
  }
}
