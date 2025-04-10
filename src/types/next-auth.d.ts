import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// Extending NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      accessToken: string;
      refreshToken: string;
    };
  }

  interface User {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken: string;
    refreshToken: string;
  }
}

// Extending NextAuth JWT types
declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
    accessToken: string;
    refreshToken: string;
  }
}
