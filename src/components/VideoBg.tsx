import { forwardRef } from "react";

type Props = {
  src: string;
  className?: string;
  overlay?: string;
};

export const VideoBg = forwardRef<HTMLVideoElement, Props>(
  ({ src, className = "", overlay = "from-background/60 via-background/50 to-background" }, ref) => {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <video
          ref={ref}
          src={src}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${overlay}`}
        />
        <div className="absolute inset-0 grain" />
      </div>
    );
  },
);
VideoBg.displayName = "VideoBg";
