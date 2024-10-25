import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, token, user }) {
      //Aqui tengo que retornar la session modificada con el rol:
      //Dentro del token o de la sesion.user puedo encontrar el correo
      //con el correo encontrado hago un findUnique a primsa.user
      //Añado el resultado a session.user.roles
      return session;
    },
  },
});
