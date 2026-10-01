"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import type { Video } from "@/lib/videos";

export function VideoShowcase({ video, index }: { video: Video; index: number }) {
  const [playing, setPlaying] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!playing) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlaying(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [playing]);

  return (
    <article className="project-row">
      <button
        className="project-media"
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Watch ${video.title}`}
      >
        <Image src={`https://vumbnail.com/${video.vimeoId}.jpg`} alt="" fill sizes="(max-width: 760px) 100vw, 65vw" />
        <span className="play-button"><Play fill="currentColor" aria-hidden="true" /></span>
        <span className="project-number">0{index + 1}</span>
      </button>
      <div className="project-copy">
        <p className="eyebrow">{video.category} · {video.year}</p>
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <span className="client-name">For {video.client}</span>
      </div>
      {playing && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={video.title} onClick={() => setPlaying(false)}>
          <button
            ref={closeButton}
            autoFocus
            className="video-close"
            type="button"
            onClick={() => setPlaying(false)}
            onKeyDown={(event) => event.key === "Escape" && setPlaying(false)}
            aria-label="Close video"
          >
            <X aria-hidden="true" />
          </button>
          <div className="video-frame" onClick={(event) => event.stopPropagation()}>
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              title={video.title}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => closeButton.current?.focus()}
            />
          </div>
        </div>
      )}
    </article>
  );
}
