import AuthNext from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../utils/spotify_api";

const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
};

export default AuthNext({
    providers: [
        SpotifyProvider({
            authorization: LOGIN_URL
            ,clientId: process.env.SPOTIFY_CLIENT_ID
            ,clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
      signIn: "/auth/signin",
      signOut: "/"
    },
    callbacks: {
      async jwt({ token, account, user}) {
        // if initial signin
        if (account && user) {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: account.expires_at * 1000
          }
        }

        // if previous token hasn't expired then..
        if (Date.now() < token.accessTokenExpires) return token;

        // if token has expired
        return await refreshAccessToken(token);
      },
      async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;

        return session;
      }
    }
});

