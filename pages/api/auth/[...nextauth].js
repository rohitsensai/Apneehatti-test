import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import main from "../../../database/conn";

const { AUTH_SECRET, HOST } = process.env;

export const authOptions = {
  secret: AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log("inside nextauth", { credentials, HOST });
          // Your initial line of code
          console.log("This is the line of code before the pause");

          // Pause execution for 10 seconds
          setTimeout(function () {
            // Code to execute after the pause
            console.log("This is the line of code after the 10-second pause");
          }, 100000); // 10000 milliseconds = 10 seconds

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
          console.error(`Error: ${error}`);
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
