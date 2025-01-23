export function Subtitle({ children }: { children?: React.ReactNode}) {
  return (
    <p className='text-muted-foreground text-sm'>
      {children}
    </p>
  );
}