import { 
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
  VolumeOffIcon
} from "@heroicons/react/outline";
import { 
  RewindIcon,
  SwitchHorizontalIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  FastForwardIcon
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import { useSongInfo } from "../../hooks/useSongInfo";
import { useSpotify } from "../../hooks/useSpotify";

export function Player() {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session } = useSession();
  const [ volume, setVolume ] = useState(50);
  const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState); 
  const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);

  const artists = songInfo?.artists.map(res => {
    return res.name
  });

  function fetchCurSong() {
    if(!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data.body?.item?.id!);

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data?.body?.is_playing);
        });
      });
    }
  };

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      try {
        if(data.body.is_playing) {
          spotifyApi.pause().catch((error) => console.log(error));
          setIsPlaying(false);
        } else {
          spotifyApi.play().catch((error) => console.log(error));
          setIsPlaying(true);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch(error => {console.log(error)});
    }, 500), []);

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi]);

  useEffect(() => {
    if(volume >= 0 && volume <= 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  return(
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
      grid grid-cols-3 text-sm md:text-base px-2 md:px-8"
    >
      <div className="flex items-center space-x-4">
        <img className='hidden md:inline h-10 w-10' src={songInfo?.album?.images[0]?.url} alt={songInfo?.name} />

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{artists?.join(', ')}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause}/>
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        {volume > 0 ? (
        <VolumeDownIcon className="button" onClick={() => volume > 0 && setVolume(0)} />
        ) : (
          <VolumeOffIcon className="button" onClick={() => setVolume(50)} />
        )}
          <input 
            className="w-14 md:w-28" 
            type="range" 
            value={volume} 
            min={0} max={100} 
            onChange={(e) => setVolume(Number(e.target.value))} 
          />
        <VolumeUpIcon className="button" onClick={() => volume <= 100 && setVolume(volume + 10)} />
      </div>
    </div>
  );
}