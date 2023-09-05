import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../../utils/api-client";

const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const getUser = await client(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/user/login`,
          {
            body: {
              email: req.body?.email,
              password: req.body?.password,
            },
          }
        );
        if(!getUser)
        return null;
        const user = {
          id: getUser.id,
          role: getUser.role,
          token: getUser.token,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
