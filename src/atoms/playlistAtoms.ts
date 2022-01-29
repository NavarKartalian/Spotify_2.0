import { atom } from 'recoil';

export interface ImageObjects {
  url: string;
  height?: number | undefined;
  width?: number | undefined;
}

export interface PlaylistTrackObject {
  track: {
    id: string;
    name: string;
    album: {
      images: ImageObjects[];
      name: string;
    };
    artists: {
      name: string;
      id: string;
    }[];
    duration_ms: number;
    uri: string;
  }
}

export interface PlaylistProps {
  id: string;
  name: string;
  description: string | null;
  owner: {
    display_name?: string | undefined;
    external_urls: {
      spotify: string;
    }
  }
  images: ImageObjects[];
  tracks: {
    total: number;
    items: PlaylistTrackObject[];
  }
}

export const playlistState = atom({
  key: "playlistState",
  default: {} as PlaylistProps,
})

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '3su1gjNin5yvCxSTQc6I9I',
});