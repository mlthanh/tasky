import { useEffect } from 'react';
import ReactPlayer from 'react-player';

type YouTubeBGProps = {
  videoId: string;
  volume?: number;
};

const YouTubeBG = ({ videoId, volume }: YouTubeBGProps) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[0]">
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${videoId}`}
        playing
        loop
        muted={false}
        volume={volume}
        controls={false}
        width="300%"
        height="100%"
        style={{
          marginLeft: '-100%',
          pointerEvents: 'none',
          userSelect: 'none',
          scale: '1.15'
        }}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              playsinline: 1
            }
          } as any
        }}
      />
    </div>
  );
};

export default YouTubeBG;
