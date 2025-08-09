import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";

export type Track = {
  id: string;
  title: string;
  src: string;
  artwork?: string;
};

type PlayerContextType = {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  current?: Track;
  playTrack: (t: Track, replaceQueue?: boolean) => void;
  addToQueue: (t: Track) => void;
  next: () => void;
  prev: () => void;
  toggle: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener("ended", () => next());
    }
    return audioRef.current;
  };

  const current = useMemo(() => (currentIndex >= 0 ? queue[currentIndex] : undefined), [queue, currentIndex]);

  const play = (track: Track) => {
    const audio = ensureAudio();
    if (audio.src !== track.src) audio.src = track.src;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    track && track.id && track.title && track.src && trackEvent(track);
  };

  const trackEvent = (t: Track) => track("play_preview", { id: t.id, title: t.title });

  const playTrack = (t: Track, replaceQueue = false) => {
    setQueue((q) => (replaceQueue ? [t] : q.length ? [...q, t] : [t]));
    setCurrentIndex((idx) => (replaceQueue || idx === -1 ? 0 : idx));
    setTimeout(() => play(t), 0);
  };

  const addToQueue = (t: Track) => setQueue((q) => [...q, t]);

  const next = () => {
    setCurrentIndex((idx) => {
      const nextIdx = idx + 1 < queue.length ? idx + 1 : 0;
      const t = queue[nextIdx];
      if (t) play(t);
      return nextIdx;
    });
  };

  const prev = () => {
    setCurrentIndex((idx) => {
      const prevIdx = idx - 1 >= 0 ? idx - 1 : queue.length - 1;
      const t = queue[prevIdx];
      if (t) play(t);
      return prevIdx;
    });
  };

  const toggle = () => {
    const audio = ensureAudio();
    if (!current) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      play(current);
    }
  };

  return (
    <PlayerContext.Provider value={{ queue, currentIndex, isPlaying, current, playTrack, addToQueue, next, prev, toggle }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
