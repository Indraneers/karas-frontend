import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

export function ColorPicker({
  background,
  setBackground,
  className
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#ef4444',
    '#dc2626',
    '#dc2626',
    '#fb923c',
    '#f97316',
    '#ea580c',
    '#fbbf24',
    '#f59e0b',
    '#d97706',
    '#facc15',
    '#eab308',
    '#ca8a04',
    '#a3e635',
    '#84cc16',
    '#65a30d'
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="flex items-center gap-2 w-full">
            {background ? (
              <div
                className="!bg-cover !bg-center rounded w-4 h-4 transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="w-4 h-4" />
            )}
            <div className="flex-1 truncate">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-card p-2 border rounded-md w-64">

        <div className="flex flex-wrap gap-1 mt-0">
          {solids.map((s) => (
            <div
              key={s}
              style={{ background: s }}
              className="rounded-md w-6 h-6 cursor-pointer active:scale-105"
              onClick={() => setBackground(s)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
