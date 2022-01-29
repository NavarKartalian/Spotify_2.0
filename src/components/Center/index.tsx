import { LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from 'lodash';
import { playlistState, playlistIdState, PlaylistProps } from "../../atoms/playlistAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSpotify } from "../../hooks/useSpotify";
import { Songs } from "../Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
]

export function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [ color, setColor ] = useState<string | undefined>('');
  const playlistId = useRecoilValue(playlistIdState);
  const [ playlist, setPlaylist ] = useRecoilState<PlaylistProps>(playlistState);

  useEffect(()  => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    }).catch(error => console.log('Something went wrong', error));
  }, [spotifyApi, playlistId]);
  
  return(
    <>
      <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
        <header className="absolute top-5 right-8">
          <div className="flex items-center bg-black space-x-3 opacity-90 
            cursor-pointer rounded-full p-1 pr-2 hover:opacity-80 text-white
            hover:scale-[110%] transition-all duration-300"
            onClick={() => signOut()}
          >
            <img className="rounded-full w-10 h-10" src={session?.user?.image!} alt="" />
            <h2>{session?.user?.name}</h2>
            <LogoutIcon className="w-5 h-5" />
          </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black 
          ${color} h-80 text-white p-8`}
        >
          <img className="h-56 w-56 shadow-2xl" src={playlist?.images?.[0]?.url} alt={playlist.name} />
          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold mb-2">{playlist?.name}</h1>
            <p className="text-gray-400 text-sm">{playlist?.description}</p>
            <div className="flex space-x-2">
              <a href={playlist?.owner?.external_urls.spotify} target={"_blank"} className="text-white text-sm font-bold">
                {playlist?.owner?.display_name}
              </a>
              <p>&#183;</p>
              <p className="text-gray-400 text-sm">{playlist?.tracks?.total} musics</p>
            </div>
          </div>
        </section>

        <div>
          <Songs />
        </div>
      </div>
    </>
  );
}