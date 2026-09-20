"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`mx-auto max-w-5xl overflow-hidden border border-concrete/20 transition-all duration-700 ease-out motion-reduce:transition-none ${
        isRevealed
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-[0.98]"
      }`}
    >
      <video
        src="/video (construction-timelapse).mp4"
        muted
        loop
        autoPlay
        playsInline
        className="block h-full w-full"
      />
    </div>
  );
}
