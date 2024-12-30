interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-grow bg-background w-full container">
      {children}
    </main>
  );
}