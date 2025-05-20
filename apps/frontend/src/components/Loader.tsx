export default function Loader() {
  return (
    <div className="flex items-center justify-center marker:text-center bg-[#00ADB5]">
      <svg
        className="loading"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100%"
        height="50%"
        viewBox="0 0 574.558 120"
        enableBackground="new 0 0 574.558 120"
        xmlSpace="preserve"
      >
        <defs>
          <image
            id="image"
            fillRule="nonzero"
            width="100%"
            height="100%"
            href="/loader_trans2.png"
            className=""
          />

          <pattern
            id="water"
            width=".25"
            height="1.1"
            patternContentUnits="objectBoundingBox"
          >
            <path
              fill="#fff"
              fillRule="nonzero"
              d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"
            />
          </pattern>
        </defs>

        <rect
          className="animate-waveFillUp"
          fill="url(#water)"
          x="-400"
          y="0"
          width="1600"
          height="100%"
        />

        <use x="0" y="0" xlinkHref="#image" opacity="1" />
      </svg>
    </div>
  );
}
