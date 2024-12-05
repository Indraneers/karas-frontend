import { cn } from "@/lib/utils";

interface ThumbnailProps {
  className?: string;
  src: string;
}

export function Thumbnail({ className, src }: ThumbnailProps) {
  return (
    <div className={cn([
      "flex justify-center bg-muted rounded-md h-full aspect-[4/3]",
      className
    ])}>
      <img
        className="w-auto h-full object-cover"
        src={src}
        alt="" />
    </div>
  );
}