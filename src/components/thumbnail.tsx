import { cn } from "@/lib/utils";

interface ThumbnailProps {
  className?: string;
  src: string;
}

export function Thumbnail({ className, src }: ThumbnailProps) {
  return (
    <div className={cn([
      "flex justify-center bg-muted rounded-md aspect-[16/9]",
      className
    ])}>
      <img
        className="w-auto max-w-full h-auto max-h-full object-contain"
        src={src}
        alt="" />
    </div>
  );
}