import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Page } from "@/types/page";
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
interface SearchGroupProps<T> {
  className?: string;
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  placeholder?: string;
  fetchNextPage?: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<Page<T>, unknown>, Error>>;
  hasNextPage?: boolean;
}

export function SearchGroup<T>({ className, title, isOpen, children, placeholder, fetchNextPage, hasNextPage }: SearchGroupProps<T>) {
  return (
    <div className={cn([
      "hidden px-2 py-1",
      isOpen && 'block',
      className
    ])}>
      <div className="font-medium text-muted-foreground text-xs">
        {title}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        {children}
      </div>
      {
        fetchNextPage && placeholder && hasNextPage &&
        <SearchNext placeholder={placeholder} fetchNextPage={fetchNextPage} />
      }
    </div>
  );
}

interface SearchNextProps<T> {
  placeholder: string;
  fetchNextPage: ((options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<Page<T>, unknown>, Error>>) | undefined;
}

export function SearchNext<T>({ placeholder, fetchNextPage } : SearchNextProps<T>) {
  return (
    <div className="flex justify-end">
      <Button 
        variant='ghost' 
        className="gap-1 hover:bg-transparent p-0 px-1 py-1 h-auto text-accent hover:text-primary text-xs underline"
        onClick={(e) => {
          e.preventDefault();
          if (fetchNextPage) {
            fetchNextPage();
          }
        }}
      >Show more {placeholder}</Button>
    </div>
  );
}