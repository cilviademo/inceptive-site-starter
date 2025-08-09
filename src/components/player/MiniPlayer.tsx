import { usePlayer } from "@/context/PlayerContext";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export default function MiniPlayer() {
  const { current, isPlaying, prev, next, toggle } = usePlayer();
  if (!current) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex items-center gap-3 py-2">
        <img src={current.artwork} alt="Current track artwork" className="h-10 w-10 rounded-md object-cover border"/>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{current.title}</p>
          <div aria-hidden className="h-1 w-full bg-muted rounded">
            <div className="h-1 w-1/3 bg-gradient-primary rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Previous" onClick={prev}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label={isPlaying ? "Pause" : "Play"} onClick={toggle}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Next" onClick={next}>
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
