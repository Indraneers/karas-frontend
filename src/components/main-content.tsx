interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <div className="bg-gradient-to-b from-background to-[rgba(30,41,59,0.05)] w-full h-full">
      <div className="container">
        {children}
      </div>
    </div>
  );
}