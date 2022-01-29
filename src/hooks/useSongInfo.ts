import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import { useSpotify } from './useSpotify';

interface SongInfoProps {
  album: {
    images: {
      url: string;
    }[];
  }
  id: string;
  name: string;
  artists: {
    name: string;
    id: string;
  }[];
}

export function useSongInfo() {
  const spotifyApi = useSpotify();
  const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
  const [ songInfo, setSongInfo ] = useState<SongInfoProps>();

  useEffect(() => {
    const fetchSongInfo = async () => {
      if(currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then(res => res.json());

        setSongInfo(trackInfo);
      }
    }

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}