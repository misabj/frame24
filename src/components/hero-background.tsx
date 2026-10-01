"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeroBackground({ src, poster }: { src: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (src && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void video.current?.play().catch(() => {});
    }
  }, [src]);

  return (
    <>
      <div className="hero-backdrop" style={{ backgroundImage: `url("${poster}")` }}>
        {src && <video ref={video} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
      </div>
      {src && (
        <button className="hero-playback" type="button" title={playing ? "Pause background video" : "Play background video"} aria-label={playing ? "Pause background video" : "Play background video"} onClick={() => playing ? video.current?.pause() : void video.current?.play().catch(() => {})}>
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      )}
    </>
  );
}