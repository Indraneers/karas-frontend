import { cn } from "@/lib/utils";

export function FilterIcon({ className, src } : { className?: string, src: string }) {
  return (
    <div
      className={cn([
        "block relative after:w-full h-full",  
        className
      ])}
      style={{
        // Mask styling
        WebkitMask: `url('${ src }') no-repeat center/contain`,
        mask: `url('${ src }') no-repeat center/contain`,
        // Ensure the div expands
        minWidth: '100%',
        minHeight: '100%'
      }}
    />
  );
}