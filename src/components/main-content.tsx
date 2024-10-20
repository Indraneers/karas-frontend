interface MainContentProps {
  children: React.ReactNode;
  isContainer?: boolean
}

export function MainContent({ children, isContainer = false }: MainContentProps) {
  return (
    <div className="bg-gradient-to-b from-background to-[rgba(30,41,59,0.05)] w-full h-full max-h-full">
      <div className={isContainer ? 'container' : 'max-h-full h-full'}>
        {children}
      </div>
    </div>
  );
}