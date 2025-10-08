type YouTubeBGProps = {
  videoId: string;
};

const YouTubeBG = ({ videoId }: YouTubeBGProps) => {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none aspect-video z-[0]">
      <iframe
        className="w-[300%] h-full ml-[-100%]"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?list=RDnnv-vXf_GgI&autoplay=1&loop=1&controls=0&color=white&moderbranding=0&rel=0&playsinline=1&enablejsapi=1&playlist=${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeBG;
