import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcryptjs";
import  { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        email: string;
        username: string;
      };
    }
  
    interface User {
      id: string;
      email: string;
      username: string;
    }
  }

export const autchOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials?.email,
        };

        const findUser = await prisma.user.findUnique({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(findUser.id),
          username: findUser.username,
          email: findUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) {
        return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (user) {
        token.id = String(user.id);
        token.username = String(user.username);
        token.email = String(user.email);
      }

      return token;
    },
    session({ session, token }) {
        if (session?.user) {
          session.user.id = String(token.id);
          session.user.username = String(token.username);
          session.user.email = String(token.email);
        }
  
        return session;
    }
  },
};