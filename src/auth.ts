import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInWithCredentials } from "./auth/actions/auth-actions";

declare module "next-auth" {
  interface Session {
    user: {
      roles: string[];
    } & DefaultSession["user"];
  }
}

const credentialsProvider = Credentials({
  credentials: {
    email: { label: "email", type: "email", placeholder: "usuraio@gmail.com" },
    password: { label: "Password", type: "password", placeholder: "Password" },
  },
  async authorize(credentials, req) {
    const user = await signInWithCredentials(
      credentials.email as string,
      credentials.password as string
    );
    if(user){
      return user
    }

    return null;
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google, credentialsProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email ?? "",
        },
      });
      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles as string[];
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});

