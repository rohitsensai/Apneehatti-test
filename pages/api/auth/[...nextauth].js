import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import main from "../../../database/conn";

const { AUTH_SECRET, HOST } = process.env;

export const authOptions = {
  secret: AUTH_SECRET,
  providers: [
    
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log({ credentials, HOST });
          await main().catch((err) => console.error(err));
          const response = await fetch(`${HOST}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Include cookies
          });
          const { ok, status } = response;

          if (status === 200 && ok) {
            const user = await response.json();
            console.log({ user });
            return user;
          }

          // Handle non-200 response
          console.error(`Error: ${status}`);
          return null;
        } catch (error) {
          console.error(`Errorrr: ${error}`);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 1 * 10 * 60, // Set to 10 min in seconds
  },
  callbacks: {
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && user._id) {
        token.id = user._id;
        token.accessToken = user.token;
        token.name = user.fullname;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
