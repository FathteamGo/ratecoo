import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // TODO: Validate credentials against database
        if (
          credentials.email === "demo@example.com" &&
          credentials.password === "password"
        ) {
          return {
            id: "user-1",
            email: "demo@example.com",
            name: "Demo User",
            tier: "free",
          };
        }
        return null;
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
