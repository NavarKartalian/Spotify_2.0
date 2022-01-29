import { useRecoilState } from "recoil";
import { PlaylistTrackObject } from "../../atoms/playlistAtoms";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import spotifyApi from "../../pages/api/lib/spotify";
import { millisToMinutesAndSeconds } from "../../pages/api/lib/time";

interface SongProps {
  order: number;
  songs: PlaylistTrackObject;
}

export function Song({ order, songs }: SongProps) {
  const artists = songs.track.artists.map(res => {
    return res.name
  });
  const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
  const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);

  function playSong() {
    setCurrentTrackId(songs.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [songs.track.uri],
    }).catch((error) => {console.log(error)});
  }

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900
      rounded-lg cursor-pointer hover:scale-[102%] transition-all duration-500"
      onClick={() => playSong()}
    >
      <div className="flex items-center space-x-4">
        <p>{order}</p>
        <img className="w-20 h-20" src={songs?.track?.album?.images[0]?.url} alt={songs.track.name} />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{songs.track.name}</p>
          <div className="flex space-x-2 w-36 lg:w-60">
            <p>{artists.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-48 lg:w-60">{songs.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(songs.track.duration_ms)}</p>
      </div>
    </div>
  );
}