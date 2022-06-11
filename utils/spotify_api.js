import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email"
    ,"playlist-read-private"
    ,"user-follow-modify"
    ,"user-follow-read" 
    ,"user-library-modify"
    ,"user-library-read"
    ,"user-read-private" 
    ,"playlist-read-collaborative"
    ,"playlist-modify-public"
    ,"playlist-read-private"
    ,"playlist-modify-private"
].join(',')

const params = {
    scope: scopes
};

const queryParams = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export { LOGIN_URL };
export default spotifyApi;
