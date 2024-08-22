import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email;
        
        if ((email?.startsWith("13523") || email?.startsWith("18223") || email?.startsWith("19623") ) && email.endsWith("@std.stei.itb.ac.id")) {
          return true;         
        } else {
          return false; 
        }
      }
      return true; 
    },
    async session({ session, user }) {
      const userData = await db.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
  
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: userData?.role ?? null,
        },
      };
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
