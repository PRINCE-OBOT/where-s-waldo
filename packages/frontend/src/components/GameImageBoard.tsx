import { useRef } from "react";
import StampFeedback from "./StampFeedback";

export interface Stamp {
  id: string;
  offsetX: number;
  offsetY: number;
  kind: "hit" | "miss";
  label: string;
}

interface Props {
  src: string;
  alt: string;
  stamps: Stamp[];
  disabled: boolean;
  onImageReady: (clientWidth: number, clientHeight: number) => void;
  onBoardClick: (offsetX: number, offsetY: number) => void;
}

export default function GameImageBoard({
  src,
  alt,
  stamps,
  disabled,
  onImageReady,
  onBoardClick
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !imgRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;

    onBoardClick(offsetX, offsetY);
  };

  return (
    <div
      className={[
        "relative w-full select-none rounded-sm overflow-hidden border-2 border-brass/40",
        disabled ? "cursor-default" : "cursor-crosshair-custom"
      ].join(" ")}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-auto block"
        onClick={handleClick}
        onLoad={(e) => {
          const { clientWidth, clientHeight } = e.currentTarget;
          onImageReady(clientWidth, clientHeight);
        }}
        draggable={false}
      />
      {stamps.map((s) => (
        <StampFeedback
          key={s.id}
          x={s.offsetX}
          y={s.offsetY}
          kind={s.kind}
          label={s.label}
        />
      ))}
    </div>
  );
}
