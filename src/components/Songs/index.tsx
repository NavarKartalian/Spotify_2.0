import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistAtoms";
import { Song } from "../Song";

export function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <>
      <div className="px-8 flex-col pb-28 space-y-1 text-white">
        {playlist?.tracks?.items.map((track, index) => (
          <Song key={track.track.id} order={index + 1} songs={track} />
        ))}
      </div>
    </>
  );
}