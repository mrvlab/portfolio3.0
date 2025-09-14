import {
  useState,
  useEffect,
  useRef,
  ComponentRef,
  useMemo,
  useCallback,
} from 'react';
import MuxPlayer from '@mux/mux-player-react';
import '@mux/mux-player';
import '@mux/mux-player/themes/minimal';

type IMuxVideo = {
  playbackId: string;
  className?: string;
  aspectRatio?: string;
  thumbnailTime?: number;
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean | 'muted' | 'any';
  loop?: boolean | string;
};

// Constants moved outside component to prevent recreation
const INTERSECTION_OPTIONS = {
  root: null,
  rootMargin: '50px',
  threshold: 0.5,
} as const;

const DEFAULT_ASPECT_RATIO = '16/9';

// CSS styles object moved outside to prevent recreation
const HIDDEN_CONTROLS_STYLES = {
  '--controls': 'none',
  '--dialog': 'none',
  '--loading-indicator': 'none',
  '--play-button': 'none',
  '--live-button': 'none',
  '--seek-backward-button': 'none',
  '--seek-forward-button': 'none',
  '--mute-button': 'none',
  '--captions-button': 'none',
  '--airplay-button': 'none',
  '--pip-button': 'none',
  '--fullscreen-button': 'none',
  '--cast-button': 'none',
  '--playback-rate-button': 'none',
  '--volume-range': 'none',
  '--time-range': 'none',
  '--time-display': 'none',
  '--duration-display': 'none',
  '--rendition-menu-button': 'none',
  '--center-controls': 'none',
  '--top-controls': 'none',
  '--bottom-controls': 'none',
} as const;

export default function MuxVideo({
  playbackId,
  className,
  aspectRatio,
  thumbnailTime,
  poster,
  muted = true,
  autoPlay = 'muted',
  loop = true,
}: IMuxVideo) {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<ComponentRef<typeof MuxPlayer>>(null);

  // Memoize aspect ratio calculation
  const finalAspectRatio = useMemo(() => {
    if (!aspectRatio) return DEFAULT_ASPECT_RATIO;
    return aspectRatio.replace(':', '/');
  }, [aspectRatio]);

  // Memoize loop value conversion
  const loopValue = useMemo(() => {
    return (loop ? 'true' : 'false') as unknown as boolean;
  }, [loop]);

  // Memoize player styles
  const playerStyles = useMemo(
    () => ({
      aspectRatio: finalAspectRatio,
      ...HIDDEN_CONTROLS_STYLES,
    }),
    [finalAspectRatio]
  );

  // Memoize metadata
  const metadata = useMemo(
    () => ({
      video_id: playbackId,
      video_title: 'Video',
    }),
    [playbackId]
  );

  // Optimized intersection observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const player = videoRef.current;

      if (!player) return;

      if (entry.isIntersecting) {
        // Use requestAnimationFrame for better performance than setTimeout
        requestAnimationFrame(() => {
          player.play?.();
        });
      } else {
        player.pause?.();
      }
    },
    []
  );

  useEffect(() => {
    setIsMounted(true);

    const observer = new IntersectionObserver(
      handleIntersection,
      INTERSECTION_OPTIONS
    );
    const element = videoRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [handleIntersection]);

  if (!isMounted) {
    return null;
  }

  return (
    <MuxPlayer
      ref={videoRef}
      className={`mux-player-ui-none ${className}`}
      playbackId={playbackId}
      thumbnailTime={thumbnailTime}
      poster={poster}
      muted={muted}
      autoPlay={autoPlay}
      loop={loopValue} // String format required due to React 19 + Next.js 15 + Mux Player React bug
      style={playerStyles as React.CSSProperties}
      metadata={metadata}
    />
  );
}
