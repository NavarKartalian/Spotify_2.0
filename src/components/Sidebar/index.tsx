import { 
  HomeIcon, 
  LibraryIcon, 
  SearchIcon, 
  PlusCircleIcon, 
  HeartIcon,
  RssIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistAtoms';
import { useSpotify } from '../../hooks/useSpotify';

interface userPlaylistsProps {
  id: string;
  name: string;
  description?: string | null;
}

export function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [ playlist, setPlaylist ] = useState<userPlaylistsProps[]>([]);
  const [ playlistId, setPlaylistId ] = useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items)
      });
    }
  }, [session, spotifyApi]);

  return (
    <>
      <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 
        overflow-y-scroll scrollbar-hide h-screen w-full sm:max-w-[12rem] lg:max-w-[15rem] 
        hidden md:inline-flex pb-36'
      >
        <div className='space-y-4'>
          <button className='flex items-center space-x-2 hover:text-white'>
            <HomeIcon className='h-5 w-5' />
            <p>Home</p>
          </button>

          <button className='flex items-center space-x-2 hover:text-white'>
            <SearchIcon className='h-5 w-5' />
            <p>Search</p>
          </button>

          <button className='flex items-center space-x-2 hover:text-white'>
            <LibraryIcon className='h-5 w-5' />
            <p>Your Library</p>
          </button>

          <hr className='border-t-[0.1px] border-gray-900' />

          <button className='flex items-center space-x-2 hover:text-white'>
            <PlusCircleIcon className='h-5 w-5' />
            <p>Create a Playlist</p>
          </button>

          <button className='flex items-center space-x-2 hover:text-white'>
            <HeartIcon className='h-5 w-5' />
            <p>Liked Songs</p>
          </button>

          <button className='flex items-center space-x-2 hover:text-white'>
            <RssIcon className='h-5 w-5' />
            <p>Your Episodes</p>
          </button>
          
          <hr className='border-t-[0.1px] border-gray-900' />

          {playlist.map(res => (
            <p key={res.id} className='cursor-pointer hover:text-white' onClick={() => setPlaylistId(res.id)}>{res.name}</p>
          ))}
        </div>
      </div>
    </>
  );
}