// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { findOrCreateUser, mergeUserData } from "../../../lib/user";

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const isNewUser = await checkIfNewUser(user.email);
      if (isNewUser) {
        await createUserInNestBackend(user);
      }
      return true;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
