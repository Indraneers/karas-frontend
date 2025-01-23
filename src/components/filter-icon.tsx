import { cn } from "@/lib/utils";

export function FilterIcon({ className, src } : { className?: string, src: string }) {
  return (
    <div
      className={cn([
        "w-10 h-10",  
        className
      ])}
      style={{ 
        WebkitMask: `url(${ src }) no-repeat center`, 
        WebkitMaskSize: 'contain', 
        mask: `url(${ src }) no-repeat center`, 
        maskSize: 'contain'
      }}
    />
  );
}