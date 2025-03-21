import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginUser, GetProfileUser } from "../pusb-user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await LoginUser(credentials.email, credentials.password);
          const data = res.data;

          if (data?.token) {
            const { access_token, refresh_token } = data.token;
            return {
              accessToken: access_token,
              refreshToken: refresh_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("User callback", user);
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // Fetch user profile using the access token
        try {
          const profileData = await GetProfileUser(token.accessToken);
          if (profileData?.data) {
            token.id = profileData.data[0].id || "";
            token.name = profileData.data[0].name || "";
            token.email = profileData.data[0].email || "";
            token.role = profileData.data[0].role || "";
          }
        } catch (error) {
          console.error("Error fetching profile in JWT callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      console.log("Session callback", session);
      session.user = {
        id: token.id || "",
        name: token.name || "",
        email: token.email || "",
        role: token.role || "",
        accessToken: token.accessToken || "",
        refreshToken: token.refreshToken || "",
      };
      return session;
    },
  },
  pages: {
    error: "/",
    signIn: "/auth/signin",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
