import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { database } from "@ratecoo/db/client";
import { users } from "@ratecoo/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // Validate credentials against database
          const email = credentials.email as string;
          const password = credentials.password as string;
          
          // Find user in database
          const dbUsers = await database.select()
            .from(users)
            .where(eq(users.email, email));
            
          if (dbUsers.length === 0) {
            return null; // User not found
          }
          
          const user = dbUsers[0];
          
          // In a real app, you would hash and compare passwords
          // For now, we'll just check if the password matches
          if (user.password !== password) {
            return null; // Invalid password
          }
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            tier: user.tier,
          };
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
        token.id = user.id;
        token.tier = (user as any).tier;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).tier = token.tier;
      }
      return session;
    },
  },
});