import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";
import type { Session, User as NextAuthUser, DefaultSession } from "next-auth"; 
import type { JWT } from "next-auth/jwt";

import { prisma } from "@/lib/prisma"; 
import { Role } from "@prisma/client";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Authorize attempt with credentials:", credentials); 

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null; 
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          console.log(`No user found for email: ${email}`);
          return null; 
        }

        if (!user.password) {
            console.log(`User ${email} has no password set (potential OAuth user?)`);
            return null; 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          console.log(`Invalid password attempt for user: ${email}`);
          return null; 
        }

        console.log(`User ${email} authenticated successfully`);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role, 
        };
      },
    }),
    // ...add more providers here if needed (e.g., GoogleProvider)
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser & { role?: Role } }) { 
      if (user) {
        token.id = user.id;
        if (user.role) {
           token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) { 
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role; 
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', 
    // error: '/auth/error', 
    // You can add other custom pages here if needed
  },
  secret: process.env.AUTH_SECRET, 
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"]; 
  }

  // Optional: Augment the default User type if needed elsewhere
  // interface User {
  //   role?: Role;
  // }
}
