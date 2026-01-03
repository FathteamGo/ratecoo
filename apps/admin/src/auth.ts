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

          // Check if user is admin
          if (user.role !== "admin") return null;

          if ((user.password ?? "") !== password) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier,
            role: user.role,
          } as any;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).tier = (user as any).tier;
        (token as any).role = (user as any).role;
        console.log("JWT callback - setting user data:", user);
      }
      console.log("JWT callback - token:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id;
        (session.user as any).tier = (token as any).tier;
        (session.user as any).role = (token as any).role;
        console.log("Session callback - setting user data:", session.user);
      }
      console.log("Session callback - session:", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback - url:", url, "baseUrl:", baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
});