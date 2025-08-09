interface Props { storeId: string; height?: number; }

export default function BeatStarsEmbed({ storeId, height = 650 }: Props) {
  return (
    <div className="w-full">
      <iframe
        src={`https://player.beatstars.com/?storeId=${storeId}`}
        width="100%"
        height={height}
        frameBorder={0}
        scrolling="no"
        title="BeatStars Player"
      />
    </div>
  );
}
