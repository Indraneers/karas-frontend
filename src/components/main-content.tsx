interface MainContentProps {
  children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="bg-background w-full h-screen max-h-screen container">
      {children}
    </main>
  );
}