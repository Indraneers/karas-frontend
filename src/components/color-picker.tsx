import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";
import { SOFT_PALETTE, softenColor } from "@/lib/color";

export function ColorPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const preview = softenColor(background);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start py-1.5 w-[220px] h-9 font-normal text-left",
            !background && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex items-center gap-2 w-full">
            {background ? (
              <div
                className="rounded-md w-4 h-4 border border-border/60"
                style={{ background: preview }}
              />
            ) : (
              <Paintbrush className="w-4 h-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-card p-2 border border-border/60 rounded-md w-64 shadow-md">
        <div className="grid grid-cols-8 gap-1.5">
          {SOFT_PALETTE.map((s) => {
            const selected = background === s;
            return (
              <button
                key={s}
                type="button"
                style={{ background: s }}
                className={cn(
                  "rounded-md w-6 h-6 transition-transform hover:scale-110 active:scale-95",
                  selected && "ring-2 ring-foreground/40 ring-offset-1"
                )}
                onClick={() => setBackground(s)}
              />
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
