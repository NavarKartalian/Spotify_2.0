import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../pages/api/lib/spotify";


export function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if(session) {
      if(session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session?.accessToken as string);
    }
  }, [session])

  return spotifyApi;
}