import { connectToDatabase } from "@/utils/db";
import User from "@/schemas/User";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { verifyPassword } from "@/utils/auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        connectToDatabase();

        const getUser = await User.findOne({ email: req.body?.email });
        const token = jsonwebtoken.sign(
          { _id: getUser._id, role: getUser.role },
          process.env.TOKEN_SECRET as string
        );
        const user = {
          id: getUser._id,
          role: getUser.role,
          token: token,
        };

        if (
          getUser &&
          (await verifyPassword(req.body?.password, getUser.password))
        ) {
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
