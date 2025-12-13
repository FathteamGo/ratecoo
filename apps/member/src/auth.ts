import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { database } from "@ratecoo/db/client";
import { users } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const email = (credentials?.email ?? "") as string;
          const password = (credentials?.password ?? "") as string;

          if (!email || !password) return null;

          const dbUsers = await database
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (dbUsers.length === 0) return null;

          const user = dbUsers[0] as any;

          if ((user.password ?? "") !== password) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier,
          } as any;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).tier = (user as any).tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id;
        (session.user as any).tier = (token as any).tier;
      }
      return session;
    },
  },
});
